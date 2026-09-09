import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { navigation, site } from "../data/site";
import "./Header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  /** Navigating always dismisses the mobile drawer and any open submenu. */
  function closeMenu() {
    setMenuOpen(false);
    setOpenSubmenu(null);
  }

  // Close the submenu on outside click / Escape.
  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenSubmenu(null);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenSubmenu(null);
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <header className="header">
      <div className="container header__inner">
        <Link
          to="/"
          className="header__brand"
          aria-label={`${site.fullName} home`}
          onClick={closeMenu}
        >
          <img src={site.logo} alt={`${site.name} logo`} className="header__logo" />
        </Link>

        <button
          type="button"
          className="header__toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label="Main menu toggle"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={`header__burger ${menuOpen ? "is-open" : ""}`} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>

        <nav
          id="primary-navigation"
          ref={navRef}
          className={`header__nav ${menuOpen ? "is-open" : ""}`}
          aria-label="Primary"
        >
          <ul className="header__menu">
            {navigation.map((item) =>
              item.children ? (
                <li key={item.path} className="header__item header__item--has-children">
                  <button
                    type="button"
                    className="header__link header__link--button"
                    aria-expanded={openSubmenu === item.path}
                    onClick={() =>
                      setOpenSubmenu((current) => (current === item.path ? null : item.path))
                    }
                  >
                    {item.label}
                    <span className="header__caret" aria-hidden="true" />
                  </button>
                  <ul
                    className={`header__submenu ${
                      openSubmenu === item.path ? "is-open" : ""
                    }`}
                  >
                    {item.children.map((child) => (
                      <li key={child.path}>
                        <NavLink
                          to={child.path}
                          className="header__sublink"
                          onClick={closeMenu}
                        >
                          {child.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.path} className="header__item">
                  <NavLink
                    to={item.path}
                    end={item.path === "/"}
                    className={({ isActive }) =>
                      `header__link ${isActive ? "is-active" : ""}`
                    }
                    onClick={closeMenu}
                  >
                    {item.label}
                  </NavLink>
                </li>
              )
            )}
          </ul>

          <Link
            to="/verify-certificate"
            className="btn btn--primary header__cta"
            onClick={closeMenu}
          >
            Verify Certificate
          </Link>
        </nav>
      </div>
    </header>
  );
}
