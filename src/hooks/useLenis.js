import { useEffect } from "react";

export function useLenis() {
  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) return;

    let lenisInstance = null;

    const initLenis = async () => {
      const { default: Lenis } = await import("lenis");
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
      });

      const handleAnchorClick = (e) => {
        const href = e.target.closest("a")?.getAttribute("href");
        if (href?.startsWith("#") && href !== "#") {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            lenisInstance.scrollTo(target, { offset: 0 });
          }
        }
      };

      document.addEventListener("click", handleAnchorClick);

      function raf(time) {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      return () => {
        document.removeEventListener("click", handleAnchorClick);
        lenisInstance.destroy();
      };
    };

    let destroy;
    initLenis().then((d) => {
      destroy = d;
    });

    return () => {
      if (typeof destroy === "function") destroy();
    };
  }, []);
}
