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

      setAccessState({ checked: true, allowed: true, visitor: VALID_REFS[ref] });
    } else {
      setAccessState({ checked: true, allowed: false, visitor: null });
    }
  }, []);

  return accessState;
}

export function getVisitorName() {
  const ref = getStoredRef();
  return ref ? VALID_REFS[ref] || null : null;
}
