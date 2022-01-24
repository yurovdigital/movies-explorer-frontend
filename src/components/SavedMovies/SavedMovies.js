import React from 'react'
import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Footer from '../Footer/Footer'

function SavedMovies({ movies, isLoggedIn }) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <section className="saved-movies">
        <SearchForm />
        <MoviesCardList movies={movies} />
      </section>
      <Footer />
    </>
  )
}

export default SavedMovies
