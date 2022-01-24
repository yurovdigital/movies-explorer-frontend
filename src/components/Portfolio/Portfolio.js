import React from 'react'
import './Portfolio.css'
import arrow from '../../images/portfolio_link_arrow.svg'

function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__wrapper">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__links">
          <li className="portfolio__links-border">
            <a
              className="portfolio__link"
              href="https://how-to-learn-yd.vercel.app/"
              target="_black"
              rel="noreferrer"
            >
              Статичный сайт
            </a>
            <img className="portfolio__link-arrow" src={arrow} alt="Стрелка" />
          </li>
          <li className="portfolio__links-border">
            <a
              className="portfolio__link"
              href="https://russian-travel-yd.vercel.app/"
              target="_black"
              rel="noreferrer"
            >
              Адаптивный сайт
            </a>
            <img className="portfolio__link-arrow" src={arrow} alt="Стрелка" />
          </li>
          <li className="portfolio__links-border">
            <a
              className="portfolio__link"
              href="https://mesto-yd.vercel.app/"
              target="_black"
              rel="noreferrer"
            >
              Одностраничное приложение
            </a>
            <img className="portfolio__link-arrow" src={arrow} alt="Стрелка" />
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Portfolio
