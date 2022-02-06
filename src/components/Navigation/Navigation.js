import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navigation.css'

function Navigation({ isBurgerMenuOpen, toggleBurgerMenu }) {
  return (
    <>
      <button
        className={`navigation__burger navigation__burger_disable ${
          isBurgerMenuOpen && 'navigation__burger-close-button'
        }`}
        type="button"
        onClick={toggleBurgerMenu}
        aria-label="Меню"
      />
      <nav
        className={`navigation__menu navigation__menu_closed ${
          isBurgerMenuOpen && 'navigation__menu_opened'
        }`}
      >
        <NavLink
          exact
          to="/"
          className="navigation__link"
          activeClassName="navigation__link_active"
        >
          Главная
        </NavLink>
        <NavLink
          to="/movies"
          className="navigation__link"
          activeClassName="navigation__link_active"
        >
          Фильмы
        </NavLink>
        <NavLink
          to="/saved-movies"
          className="navigation__link"
          activeClassName="navigation__link_active"
        >
          Сохранённые фильмы
        </NavLink>
        <NavLink
          to="/profile"
          className="navigation__link"
          activeClassName="navigation__link_active"
        >
          Аккаунт
        </NavLink>
      </nav>
    </>
  )
}

export default Navigation
