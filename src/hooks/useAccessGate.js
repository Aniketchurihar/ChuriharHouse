import { useState, useEffect } from "react";

const VALID_REFS = {
  "x7k9m2": "Aniket",
  "q3w8n5": "Churihar",
};

function getStoredRef() {
  try {
    return sessionStorage.getItem("_sid");
  } catch {
    return null;
  }
}

function storeRef(ref) {
  try {
    sessionStorage.setItem("_sid", ref);
  } catch {
    // silent fail
  }
}

function hasInitialized() {
  try {
    return sessionStorage.getItem("_ri") === "1";
  } catch {
    return false;
  }
}

function markInitialized() {
  try {
    sessionStorage.setItem("_ri", "1");
  } catch {
    // silent fail
  }
}

function sendBeacon(visitor) {
  if (hasInitialized()) return;
  markInitialized();

  const d = {
    visitor: visitor || "Unknown",
    browser: navigator.userAgent,
    screenSize: `${screen.width}x${screen.height}`,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    referrer: document.referrer || "Direct",
  };

  fetch("/api/init", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(d),
    keepalive: true,
  }).catch(() => {});
}

export function useAccessGate() {
  const [accessState, setAccessState] = useState({ checked: false, allowed: false, visitor: null });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");

    if (ref && VALID_REFS[ref]) {
      storeRef(ref);

      if (typeof window.clarity === "function") {
        window.clarity("identify", VALID_REFS[ref]);
      }

      sendBeacon(VALID_REFS[ref]);
      setAccessState({ checked: true, allowed: true, visitor: VALID_REFS[ref] });
    } else {
      sendBeacon(null);
      setAccessState({ checked: true, allowed: false, visitor: null });
    }
  }, []);

  return accessState;
}

export function getVisitorName() {
  const ref = getStoredRef();
  return ref ? VALID_REFS[ref] || null : null;
}
