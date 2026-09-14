import { useEffect, type CSSProperties } from "react";
import { useLocation } from "react-router-dom";

/** Staggers a revealed block behind the one before it. */
export const revealDelay = (ms: number) =>
  ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

/**
 * Fades `[data-reveal]` blocks up as they enter the viewport.
 *
 * The hiding styles live behind a `.reveal-ready` class on <html> that is only
 * applied here, so the page stays fully legible when JavaScript, the observer,
 * or the user's motion preference rules the animation out. Re-runs per route so
 * a freshly mounted page gets its own elements observed.
 */
export default function useReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || !("IntersectionObserver" in window)) return;

    const root = document.documentElement;
    root.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );

    // Wait a frame so the routed page is committed before we measure it.
    const frame = requestAnimationFrame(() => {
      document
        .querySelectorAll("[data-reveal]:not(.is-visible)")
        .forEach((element) => observer.observe(element));
    });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [pathname]);
}
