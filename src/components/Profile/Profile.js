import React from 'react'
import Header from '../Header/Header'
import './Profile.css'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import { useFormWithValidation } from '../../Hooks/useFormValidation'

function Profile({ loggedIn, onUpdateUser, onSignOut, message }) {
  const user = React.useContext(CurrentUserContext)

  const { values, handleChange, resetForm, errors, isValid } =
    useFormWithValidation()

  const [buttonDisabled, setButtonDisabled] = React.useState(false)

  const { name, email } = values

  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdateUser(values)
    resetForm()
  }

  function handleFocus(evt) {
    evt.target.select()
  }
  

  React.useEffect(() => {
    if (user) {
      resetForm(user, {}, true)
    }
  }, [user, resetForm])

  React.useEffect(() => {
    if ((name !== user.name || email !== user.email) && isValid) {
      setButtonDisabled(true)
    } else {
      setButtonDisabled(false)
    }
  }, [email, isValid, name, user.email, user.name])

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
                value={name || ''}
                minLength="2"
                maxLength="30"
                onChange={handleChange}
                onFocus={handleFocus}
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
                value={email || ''}
                onChange={handleChange}
                onFocus={handleFocus}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
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
                className={`profile__button profile__button_type_submit ${
                  !buttonDisabled && 'profile__button_disabled'
                }
               `}
                type="submit"
                disabled={!buttonDisabled}
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
