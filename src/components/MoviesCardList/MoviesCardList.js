import React from 'react'
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'

function MoviesCardList({ movies, message, onSave, onDelete, savedMovies }) {
  const [currentCards, setCurrentCards] = React.useState(0)
  const [addCards, setAddCards] = React.useState(3)
  const [moviesToShow, setMoviesToShow] = React.useState([])

  const getCards = (windowSize) => {
    if (windowSize > 1280) {
      return { first: 12, extra: 3 }
    }
    if (windowSize > 768 && windowSize <= 1280) {
      return { first: 8, extra: 2 }
    }
    if (windowSize >= 320 && windowSize <= 768) {
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

  function checkSavedMovies(movie) {
    return savedMovies.find((item) => item.id === movie.id)
  }

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
                  savedMovies={checkSavedMovies(movie)}
                  key={movie.id}
                />
              ))}
            </ul>
            <button
              className={`movies__button ${
                currentCards > movies.length && 'movies__button_disabled'
              }`}
              type="button"
              onClick={renderMovies}
            >
              Еще
            </button>
          </>
        ) : (
          <p className="movies__text">{message}</p>
        )}
      </div>
    </section>
  )
}

export default MoviesCardList
