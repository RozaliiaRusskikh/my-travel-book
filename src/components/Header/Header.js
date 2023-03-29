import "./Header.scss";
import logo from "../../assets/logo/logo.png";
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <nav className="header__main-nav">
        <Link className="header__logo-link" to="/">
          <img className="header__logo" src={logo} alt="my travel book logo" />
        </Link>
        <ul className="header__main-nav-list">
          <li className="header__main-nav-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "header__main-nav-link header__main-nav-link--active"
                  : "header__main-nav-link"
              }
            >
              Home
            </NavLink>
          </li>
          <li className="header__main-nav-item">
            <NavLink
              to="/travel-notes"
              className={({ isActive }) =>
                isActive
                  ? "header__main-nav-link header__main-nav-link--active"
                  : "header__main-nav-link"
              }
            >
              Travel Notes
            </NavLink>
          </li>
          <li className="header__main-nav-item">
            <NavLink
              to="/country-facts"
              className={({ isActive }) =>
                isActive
                  ? "header__main-nav-link header__main-nav-link--active"
                  : "header__main-nav-link"
              }
            >
              Country Facts
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
