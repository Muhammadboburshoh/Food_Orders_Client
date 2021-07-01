import { Link } from "react-router-dom"

import Basket from "../../BasketPage/Basket"
import "./Header.css"
import { useBasket } from "../../../../Context/BasketContext"

import Logo from "../../../../Images/Logo.png"

function Header () {
  const [ basketDisplay, setBasketDisplay ] = useBasket()
  
  return (
    <>
      <header className="header">
        <div className="header__container">
          <Link to="#">
            <img width="160" height="83" className="header__logo" src={Logo} alt="Site-logo" />
          </Link>

          <ul className="header__menu">
            <li className="header__item">
              <Link
                 onClick={() => {
                  if(basketDisplay) {
                    setBasketDisplay(null)
                  }
                }}
                className="header__link basket-link" to="#">Savatcha</Link
                >
            </li>
          </ul>
        </div>

        <Basket />
      </header>
    </>
  )
}

export default Header