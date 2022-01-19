import React from 'react'
import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
import Preloader from '../Preloader/Preloader'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Footer from '../Footer/Footer'
import './Movies.css'

function Movies({ movies = [], isLoggedIn, isLoading }) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <SearchForm />
      {isLoading && <Preloader />}
      {!isLoading && <MoviesCardList movies={movies} isLoading={isLoading} />}
      <Footer />
    </>
  )
}

export default Movies
