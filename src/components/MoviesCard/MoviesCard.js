import React from 'react'
import './MoviesCard.css'

function MoviesCard({ movie }) {
  return (
    <li className="movies__item">
      <div className="movies__item-wrapper">
        <h3 className="movies__title">{movie.nameRu}</h3>
        <p className="movies__duration">{movie.duration} минут</p>
      </div>
      <img className="movies__image" src={movie.image} alt={movie.nameRu} />
      <button
        className={`movies__save-button ${
          movie.owner && 'movies__save-button_active'
        }`}
        type="button"
        aria-label="Сохранить"
      />
    </li>
  )
}

export default MoviesCard
