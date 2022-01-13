import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.svg'
import './Header.css'
// import Navigation from '../Navigation/Navigation'

function Header() {
  return (
    <header className="header">
      <div className="header__wrapper">
        <Link to="/">
          <img
            className="header__logo"
            src={logo}
            alt="Логотип Movies Explorer"
          />
        </Link>
        <nav>
          <Link className="header__link" to="/signup">
            Регистрация
          </Link>
          <Link to="/signin">
            <button className="header__login-button" type="button">
              Войти
            </button>
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
