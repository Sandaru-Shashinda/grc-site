import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import "./MobileDock.css";

type DockItem = {
  label: string;
  path: string;
  icon: ReactNode;
  /** The primary action sits raised in the centre of the dock. */
  primary?: boolean;
};

const items: DockItem[] = [
  {
    label: "Home",
    path: "/",
    icon: <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" />,
  },
  {
    label: "Services",
    path: "/services",
    icon: (
      <>
        <path d="M6 3h12l3 6-9 12L3 9z" />
        <path d="M3 9h18M9 3l3 6 3-6M12 21 9 9M12 21l3-12" />
      </>
    ),
  },
  {
    label: "Verify",
    path: "/verify-certificate",
    primary: true,
    icon: (
      <>
        <path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6z" />
        <path d="m8.5 12 2.5 2.5 4.5-5" />
      </>
    ),
  },
  {
    label: "Reports",
    path: "/reports",
    icon: (
      <>
        <path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z" />
        <path d="M14 3v5h5M9 13h6M9 17h6" />
      </>
    ),
  },
  {
    label: "Contact",
    path: "/contact",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
  },
];

/** Thumb-reach navigation bar pinned to the bottom of the screen on mobile. */
export default function MobileDock() {
  return (
    <nav className="mobile-dock" aria-label="Quick navigation">
      <ul className="mobile-dock__list">
        {items.map((item) => (
          <li key={item.path} className="mobile-dock__item">
            <NavLink
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `mobile-dock__link ${item.primary ? "mobile-dock__link--primary" : ""} ${
                  isActive ? "is-active" : ""
                }`
              }
            >
              <span className="mobile-dock__icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {item.icon}
                </svg>
              </span>
              <span className="mobile-dock__label">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
