import React from 'react'
import { useLocation } from 'react-router-dom'
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'

import {
  MOBILE_WIDTH,
  TABLET_WIDTH,
  DESKTOP_WIDTH,
} from '../../utils/constants'

function MoviesCardList({ movies, message, onSave, onDelete, savedMovies }) {
  const [currentCards, setCurrentCards] = React.useState(0)
  const [addCards, setAddCards] = React.useState(3)
  const [moviesToShow, setMoviesToShow] = React.useState([])

  const location = useLocation()

  const getCards = (windowSize) => {
    if (windowSize > DESKTOP_WIDTH) {
      return { first: 12, extra: 3 }
    }
    if (windowSize > TABLET_WIDTH && windowSize <= DESKTOP_WIDTH) {
      return { first: 8, extra: 2 }
    }
    if (windowSize >= MOBILE_WIDTH && windowSize <= TABLET_WIDTH) {
      return { first: 6, extra: 2 }
    }
    return { first: 5, extra: 1 }
  }

  const renderAddCards = React.useCallback(() => {
    const count = Math.min(movies.length, currentCards + addCards)
    const moreCards = movies.slice(currentCards, count)
    setMoviesToShow([...moviesToShow, ...moreCards])
    setCurrentCards(count)
  }, [currentCards, addCards, movies, moviesToShow])

  const resize = React.useCallback(() => {
    const windowSize = window.innerWidth
    setAddCards(getCards(windowSize))
  }, [])

  React.useEffect(() => {
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [resize])

  // function checkSavedMovies(movie) {
  //   return savedMovies.find((item) => item.id === movie.id)
  // }

  React.useEffect(() => {
    const windowSize = window.innerWidth
    setAddCards(getCards(windowSize).extra)
    const count = Math.min(movies.length, getCards(windowSize).first)
    setMoviesToShow(movies.slice(0, count))
    setCurrentCards(count)
  }, [movies])

  const renderMovies = React.useCallback(() => {
    renderAddCards()
  }, [renderAddCards])

  return (
    <section className="movies">
      <div className="movies__wrapper">
        {movies.length ? (
          <>
            <ul className="movies__list">
              {moviesToShow.map((movie) => (
                <MoviesCard
                  movie={movie}
                  onSave={onSave}
                  onDelete={onDelete}
                  savedMovies={savedMovies}
                  key={movie.id}
                />
              ))}
            </ul>
            {location.pathname === '/movies' && (
              <button
                className={`movies__button ${
                  currentCards > movies.length && 'movies__button_disabled'
                } ${
                  currentCards === movies.length &&
                  'movies__button_display_none'
                }`}
                type="button"
                onClick={renderMovies}
              >
                Еще
              </button>
            )}
            {location.pathname === '/saved-movies' && (
              <button
                className="movies__button_display_none"
                type="button"
                onClick={renderMovies}
              >
                Еще
              </button>
            )}
          </>
        ) : (
          <p className="movies__text">{message}</p>
        )}
      </div>
    </section>
  )
}

export default MoviesCardList
