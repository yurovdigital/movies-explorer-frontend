import React from 'react'
import { useLocation } from 'react-router-dom'
import './MoviesCard.css'

import { MOVIES_URL } from '../../utils/constants'

function MoviesCard({ movie, onSave, onDelete, savedMovies }) {
  const location = useLocation()

  const isSaved = savedMovies.some((m) => m.movieId === movie.id)

  function handleSaveClick() {
    if (isSaved) {
      onDelete(savedMovies.filter((m) => m.movieId === movie.id)[0])
    } else {
      onSave(movie)
    }
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
        <a
          href={movie.trailerLink}
          className="movies__trailer-link"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={`${MOVIES_URL}${movie.image.url}`}
            alt={movie.nameRU}
            className="movies__image"
          />
        </a>
      )}
      {location.pathname === '/saved-movies' && (
        <a
          href={movie.trailer}
          className="movies__trailer-link"
          target="_blank"
          rel="noreferrer"
        >
          <img src={movie.image} alt={movie.nameRU} className="movies__image" />
        </a>
      )}
      {location.pathname === '/movies' && (
        <button
          className={`movies__save-button ${
            isSaved && 'movies__save-button_active'
          }`}
          type="button"
          aria-label="Сохранить"
          onClick={handleSaveClick}
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
