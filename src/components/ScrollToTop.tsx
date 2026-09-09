import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Restores the top of the page on every navigation, the way a server render would. */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
}
