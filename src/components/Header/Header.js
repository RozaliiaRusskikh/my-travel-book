import "./Header.scss";

function Header() {
  return (
    <header className="header">
      <nav class="main-nav">
        <a class="main-nav__logo-link" href="../index.html">
          Travel Site{" "}
        </a>
        <ul class="main-nav__list">
          <li class="main-nav__item">
            <a class="main-nav__link" href="../index.html">
              Home
            </a>
          </li>
          <li class="main-nav__item">
            <a class="main-nav__link" href="../pages/hawaii.html">
              Hawaii
            </a>
          </li>
          <li class="main-nav__item">
            <a class="main-nav__link" href="../pages/iceland.html">
              Iceland
            </a>
          </li>
          <li class="main-nav__item">
            <a class="main-nav__link" href="../pages/greece.html">
              Greece
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
