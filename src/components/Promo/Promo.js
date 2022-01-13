import React from 'react'
import './Promo.css'

function Promo() {
  return (
    <section className="promo">
      <div className="promo__wrapper">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
      </div>
      <div className="promo__links-wrapper">
        <a className="promo__link" href="#about-project">
          О проекте
        </a>
        <a className="promo__link" href="#techs">
          Технологии
        </a>
        <a className="promo__link" href="#about-me">
          Студент
        </a>
      </div>
    </section>
  )
}

export default Promo
