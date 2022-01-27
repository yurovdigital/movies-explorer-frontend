import React from 'react'

import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Footer from '../Footer/Footer'

function SavedMovies({ savedMovies, loggedIn, onSubmit }) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <SearchForm onSubmit={onSubmit} />
      <MoviesCardList movies={savedMovies} />
      <Footer />
    </>
  )
}

export default SavedMovies
