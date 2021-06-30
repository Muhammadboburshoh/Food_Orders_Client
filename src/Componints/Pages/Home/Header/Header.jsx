import { Link } from "react-router-dom"

import "./Header.css"

import Logo from "../../../../Images/Logo.png"

function Header () {
  return (
    <>
      <header className="header">
        <div className="header__container">
          <Link to="#">
            <img width="160" height="83" className="header__logo" src={Logo} alt="Site-logo" />
          </Link>

          <ul className="header__menu">
            <li className="header__item">
              <Link className="header__link basket-link" to="#">Savatcha</Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  )
}

export default Header