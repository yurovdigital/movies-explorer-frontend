import React from 'react'
import './AboutProject.css'

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <div className="about-project__wrapper">
        <h3 className="about-project__title">О проекте</h3>
        <div className="about-project__content-wrapper">
          <aticle className="about-project__content">
            <h4 className="about-project__subtitle">
              Дипломный проект включал 5 этапов
            </h4>
            <p className="about-project__text">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </aticle>
          <aticle className="about-project__content">
            <h4 className="about-project__subtitle">
              На выполнение диплома ушло 5 недель
            </h4>
            <p className="about-project__text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </aticle>
        </div>
      </div>
      <div className="about-project__bar">
        <p className="about-project__bar-item about-project__bar-item_backrgound_green">
          1 неделя
        </p>
        <p className="about-project__bar-item about-ptoject__bar-item_text-color_white">
          4 недели
        </p>
        <span className="about-project__bar-caption">Back-end</span>
        <span className="about-project__bar-caption">Front-end</span>
      </div>
    </section>
  )
}

export default AboutProject
