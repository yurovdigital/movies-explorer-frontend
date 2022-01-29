import React from 'react'
import { useLocation } from 'react-router-dom'
import './MoviesCard.css'

import { MOVIES_URL } from '../../utils/constants'

function MoviesCard({ movie, onSave, onDelete }) {
  const location = useLocation()

  const isSaved = location.pathname === '/saved-movies'

  function handleSaveMovie() {
    onSave(movie)
  }

  function handleDeleteMovie() {
    onDelete(movie)
  }

  return (
    <li className="movies__item">
      <div className="movies__item-wrapper">
        <h3 className="movies__title">{movie.nameRU}</h3>
        <p className="movies__duration">{movie.duration} минут</p>
      </div>
      {location.pathname === '/movies' && (
        <img
          src={`${MOVIES_URL}${movie.image.url}`}
          alt={movie.nameRU}
          className="movie__image"
        />
      )}
      {location.pathname === '/saved-movies' && (
        <img src={movie.image} alt={movie.nameRU} className="movie__image" />
      )}
      {location.pathname === '/movies' && (
        <button
          className={`movies__save-button ${
            isSaved && 'movies__save-button_active'
          }`}
          type="button"
          aria-label="Сохранить"
          onClick={handleSaveMovie}
        />
      )}
      {location.pathname === '/saved-movies' && (
        <button
          className="movies__delete-button"
          type="button"
          aria-label="Сохранить"
          onClick={handleDeleteMovie}
        />
      )}
    </li>
  )
}

export default MoviesCard
