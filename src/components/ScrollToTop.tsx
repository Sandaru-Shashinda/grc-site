import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Restores the top of the page on every navigation, the way a server render would —
 * or, when the link carries a #hash, lands on that section instead.
 *
 * Keyed on the pathname only: a hash change within a page is the browser's own
 * smooth anchor scroll, which an instant jump here would cut short.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const { hash } = window.location;
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (target) {
      // Wait a frame so the routed page has laid out before we measure it.
      const frame = requestAnimationFrame(() =>
        target.scrollIntoView({ behavior: "instant" as ScrollBehavior })
      );
      return () => cancelAnimationFrame(frame);
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
}
