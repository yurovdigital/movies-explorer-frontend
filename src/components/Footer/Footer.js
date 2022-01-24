import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <p className="footer__text">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className="footer__links-wrapper">
          <p className="footer__copyright">&copy; 2022</p>
          <ul className="footer__links">
            <li className="footer__list-item">
              <a
                className="footer__link"
                href="https://praktikum.yandex.ru"
                target="_blank"
                rel="noreferrer"
              >
                Яндекс.Практикум
              </a>
            </li>
            <li className="footer__list-item">
              <a
                className="footer__link"
                href="https://github.com/yurovdigital"
                target="_blank"
                rel="noreferrer"
              >
                Guthub
              </a>
            </li>
            <li className="footer__list-item">
              <a
                className="footer__link"
                href="https://www.facebook.com/stanislav.yuroff"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
