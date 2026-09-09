import { Link, NavLink } from "react-router-dom";
import { navigation, site } from "../data/site";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <nav className="footer__nav" aria-label="Footer">
          <ul className="footer__menu">
            {navigation.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `footer__link ${isActive ? "is-active" : ""}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Link to="/" className="footer__brand" aria-label={`${site.fullName} home`}>
          <img src={site.logo} alt={`${site.name} logo`} className="footer__logo" />
        </Link>

        <p className="footer__copyright">
          Copyright © {new Date().getFullYear()} {site.fullName}
        </p>
      </div>
    </footer>
  );
}
