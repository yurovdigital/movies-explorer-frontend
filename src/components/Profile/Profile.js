import React from 'react'
import Header from '../Header/Header'
import './Profile.css'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import { useFormWithValidation } from '../../Hooks/useFormValidation'

function Profile({ loggedIn, onUpdateUser, onSignOut, message }) {
  const user = React.useContext(CurrentUserContext)

  const { values, handleChange, resetForm, errors, isValid } =
    useFormWithValidation()

  const { name, email } = values

  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdateUser(values)
    resetForm()
  }

  React.useEffect(() => {
    if (user) {
      resetForm(user, {}, true)
    }
  }, [user, resetForm])

  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="profile">
        <div className="profile__wrapper">
          <h2 className="profile__title">{`Привет, ${user.name}!`}</h2>
          <form className="profile__form" onSubmit={handleSubmit}>
            <label className="profile__label" htmlFor="name">
              Имя
              <input
                className="profile__input profile__input-name"
                id="name"
                type="text"
                name="name"
                value={name || user.name}
                minLength="2"
                maxLength="30"
                onChange={handleChange}
                required
              />
            </label>
            <span
              className={`profile__input-error ${
                !isValid && 'profile__input-error_active'
              }`}
            >
              {errors.name}
            </span>
            <label className="profile__label" htmlFor="email">
              Email
              <input
                className="profile__input profile__input-email"
                id="email"
                type="email"
                name="email"
                value={email || user.email}
                onChange={handleChange}
                required
              />
            </label>
            <span
              className={`profile__input-error ${
                !isValid && 'profile__input-error_active'
              }`}
            >
              {errors.email}
            </span>

            <div className="profile__button-wrapper">
              <span className="profile__message">{message}</span>
              <button
                className={`profile__button profile__button_type_submit
                ${
                  name === user.name &&
                  email === user.email &&
                  'profile__button_disabled'
                } ${!isValid && 'profile__button_disabled'}
               `}
                type="submit"
                disabled={!isValid}
              >
                Редактировать
              </button>
              <button
                className="profile__button profile__button_type_logout"
                type="button"
                onClick={onSignOut}
              >
                Выйти из аккаунта
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default Profile
