import React from 'react'
import { Link } from 'react-router-dom'
import { useFormWithValidation } from '../../Hooks/useFormValidation'
import logo from '../../images/logo.svg'
import './Register.css'

function Register({ onRegister, message }) {
  const { values, handleChange, resetForm, errors, isValid } =
    useFormWithValidation({})

  const { name, email, password } = values

  function handleSubmit(evt) {
    evt.preventDefault()
    onRegister(values)
    resetForm()
  }

  return (
    <section className="register">
      <div className="register__wrapper">
        <Link to="/">
          <img
            className="register__logo"
            src={logo}
            alt="Логотип Movies Explorer"
          />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <form
          className="register__form"
          name="register"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="register__inputs-wrapper">
            <label className="register__label" htmlFor="name">
              Имя
            </label>
            <input
              id="name"
              className="register__input"
              type="text"
              name="name"
              minLength="3"
              maxLength="30"
              onChange={handleChange}
              value={name || ''}
              required
            />
            <span
              className={`register__input-error ${
                !isValid && 'register__input-error_active'
              }`}
            >
              {errors.name}
            </span>
            <label className="register__label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="register__input"
              type="email"
              name="email"
              onChange={handleChange}
              value={email || ''}
              required
            />
            <span
              className={`register__input-error ${
                !isValid && 'register__input-error_active'
              }`}
            >
              {errors.email}
            </span>
            <label className="register__label" htmlFor="password">
              Пароль
            </label>
            <input
              className="register__input"
              id="password"
              type="password"
              name="password"
              minLength="5"
              onChange={handleChange}
              value={password || ''}
              required
            />
            <span
              className={`register__input-error ${
                !isValid && 'register__input-error_active'
              }`}
            >
              {errors.password}
            </span>
          </div>
          <p className="register__message">{message}</p>
          <button
            type="submit"
            className={`register__button ${
              !isValid && 'register__button_disabled'
            }`}
            disabled={!isValid}
          >
            Зарегистрироваться
          </button>
        </form>
        <p className="register__text">
          Уже зарегистрированы?
          <Link to="/signin" className="register__link">
            Войти
          </Link>
        </p>
      </div>
    </section>
  )
}

export default Register
