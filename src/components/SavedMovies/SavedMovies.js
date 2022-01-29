import React from 'react'

import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Footer from '../Footer/Footer'

function SavedMovies({ movies, loggedIn, onSubmit, onDelete, savedMovies }) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <SearchForm onSubmit={onSubmit} />
      <MoviesCardList
        movies={movies}
        onDelete={onDelete}
        savedMovies={savedMovies}
      />
      <Footer />
    </>
  )
}

export default SavedMovies
