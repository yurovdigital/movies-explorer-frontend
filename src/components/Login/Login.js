import React from 'react'
import { Link } from 'react-router-dom'
import { useFormWithValidation } from '../../Hooks/useFormValidation'
import logo from '../../images/logo.svg'
import './Login.css'

function Login({ onLogin, message }) {
  const { values, handleChange, resetForm, errors, isValid } =
    useFormWithValidation({})

  const { email, password } = values

  function handleSubmit(evt) {
    evt.preventDefault()
    onLogin(values)
    resetForm()
  }

  return (
    <section className="login">
      <div className="login__wrapper">
        <Link to="/">
          <img
            className="login__logo"
            src={logo}
            alt="Логотип Movies Explorer"
          />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
        <form
          className="login__form"
          name="login"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="login__inputs-wrapper">
            <label className="login__label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="login__input"
              type="email"
              name="email"
              onChange={handleChange}
              value={email || ''}
              required
            />
            <span
              className={`login__input-error ${
                !isValid && 'login__input-error_active'
              }`}
            >
              {errors.email}
            </span>
            <label className="login__label" htmlFor="password">
              Пароль
            </label>
            <input
              className="login__input login__input-password"
              id="password"
              type="password"
              name="password"
              onChange={handleChange}
              value={password || ''}
              required
            />
            <span
              className={`login__input-error ${
                !isValid && 'login__input-error_active'
              }`}
            >
              {errors.password}
            </span>
          </div>
          <p className="login__message">{message}</p>
          <button
            className={`login__button ${!isValid && 'login__button_disabled'}`}
            type="submit"
            disabled={!isValid}
          >
            Войти
          </button>
        </form>
        <p className="login__text">
          Еще не зарегистрированы?
          <Link to="/signup" className="login__link">
            Регистрация
          </Link>
        </p>
      </div>
    </section>
  )
}

export default Login
