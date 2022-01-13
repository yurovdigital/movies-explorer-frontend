import React from 'react'
import './AboutMe.css'
import photo from '../../images/about-me__photo.png'

function AboutMe() {
  return (
    <section className="about-me">
      <div className="about-me__wrapper">
        <h2 className="about-me__title">Студент</h2>
        <img className="about-me__photo" src={photo} alt="" />
        <h3 className="about-me__subtitle">Станислав</h3>
        <p className="about-me__caption">Фронтенд-разработчик, 34 года</p>
        <p className="about-me__text">
          Более 10 работаю в сфере интернет-маркетинга. Успел поучаствовать в
          рекламе следующих проектов: Geometrium, РосЕвроБанк, Resurso.ru,
          Изолит Трейд, ЖК Молодежный, ЖК Тетрис, Groupprice.ru и др. Последние
          3 года работал в стартап Vernum Auto - федеральная сеть автосервисов
          от AutoDistribution Russia. С начала 2021 года прохожу обучение в
          Яндекс.Практикум по профессии веб-разработчик. Из моих увлечений:
          путешествия, сноуборд и конечно же всё, что связано с гаджетами,
          технологиями, веб-разработкой.
        </p>
        <ul className="about-me__links">
          <li>
            <a href="https://" className="about-me__link">
              Facebook
            </a>
          </li>
          <li>
            <a href="https://" className="about-me__link">
              Github
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default AboutMe
