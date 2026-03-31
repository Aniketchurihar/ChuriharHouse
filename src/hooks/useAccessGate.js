import { useState, useEffect } from "react";

const VALID_REFS = {
  "x7k9m2": "Aniket",
  "q3w8n5": "Churihar",
};

function getStoredRef() {
  try {
    return sessionStorage.getItem("visitor_ref");
  } catch {
    return null;
  }
}

function storeRef(ref) {
  try {
    sessionStorage.setItem("visitor_ref", ref);
  } catch {
    // silent fail
  }
}

function hasNotifiedThisSession() {
  try {
    return sessionStorage.getItem("visitor_notified") === "true";
  } catch {
    return false;
  }
}

function markNotified() {
  try {
    sessionStorage.setItem("visitor_notified", "true");
  } catch {
    // silent fail
  }
}

function notifyVisit(visitor) {
  if (hasNotifiedThisSession()) return;
  markNotified();

  const payload = {
    visitor: visitor || "Unknown",
    browser: navigator.userAgent,
    screenSize: `${screen.width}x${screen.height}`,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    referrer: document.referrer || "Direct",
  };

  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {});
}

export function useAccessGate() {
  const [accessState, setAccessState] = useState({ checked: false, allowed: false, visitor: null });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref") || getStoredRef();

    if (ref && VALID_REFS[ref]) {
      storeRef(ref);
      window.history.replaceState({}, "", window.location.pathname);

      if (typeof window.clarity === "function") {
        window.clarity("identify", VALID_REFS[ref]);
      }

      notifyVisit(VALID_REFS[ref]);
      setAccessState({ checked: true, allowed: true, visitor: VALID_REFS[ref] });
    } else {
      notifyVisit(null);
      setAccessState({ checked: true, allowed: false, visitor: null });
    }
  }, []);

  return accessState;
}

export function getVisitorName() {
  const ref = getStoredRef();
  return ref ? VALID_REFS[ref] || null : null;
}
