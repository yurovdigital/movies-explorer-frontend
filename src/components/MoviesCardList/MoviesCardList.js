import React from 'react'
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'

function MoviesCardList({ movies = [] }) {
  return (
    <section className="movies">
      <div className="movies__wrapper">
        <ul className="movies__list">
          {movies.map((movie) => (
            <MoviesCard movie={movie} />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default MoviesCardList
