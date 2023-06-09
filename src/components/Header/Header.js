import "./Header.scss";
import logo from "../../assets/logo/logo.png";
import logoWebp from "../../assets/logo/logo.webp";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../../context/userContext";
import { useContext } from "react";

function Header() {
  const { user, onLogout } = useContext(UserContext);

  const handleLogoutClick = (event) => {
    event.preventDefault();
    onLogout();
  };

  return (
    <header className="header">
      <nav className="header__main-nav">
        <div className="header__logo-container">
          <Link className="header__logo-link" to="/">
            <picture>
              <source srcset={logoWebp} type="image/webp" />
              <img
                className="header__logo"
                src={logo}
                alt="my travel book logo"
              />
            </picture>
          </Link>
          <p className="header__logo-text">
            for the curious minded travel lovers...
          </p>
        </div>
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
          {user.isAuthenticated ? (
            <li className="header__main-nav-item header__main-nav-item--logout">
              <FontAwesomeIcon onClick={handleLogoutClick} icon={faSignOut} />
            </li>
          ) : (
            <li className="header__main-nav-item header__main-nav-item--globe">
              <Link to="/login">
                <FontAwesomeIcon icon={faGlobe} color={"#1676ba"} />
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
