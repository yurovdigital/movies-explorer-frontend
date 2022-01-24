import React from 'react'
import Header from '../Header/Header'
import './Profile.css'

function Profile({ isLoggedIn }) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <section className="profile">
        <div className="profile__wrapper">
          <h2 className="profile__title">Привет, Виталий!</h2>
          <form className="profile__form">
            <label className="profile__label" htmlFor="name">
              Имя
              <input
                className="profile__input profile__input-name"
                id="name"
                type="text"
                required
              />
            </label>
            <label className="profile__label" htmlFor="email">
              Email
              <input
                className="profile__input profile__input-nemail"
                id="name"
                type="text"
                required
              />
            </label>
            <div className="profile__button-wrapper">
              <button
                className="profile__button profile__button_type_submit"
                type="submit"
              >
                Редактировать
              </button>
              <button
                className="profile__button profile__button_type_logout"
                type="button"
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
