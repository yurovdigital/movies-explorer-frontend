import React from 'react'
import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
import Preloader from '../Preloader/Preloader'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Footer from '../Footer/Footer'
import './Movies.css'

function Movies({ loggedIn, isLoading, onSubmit }) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <SearchForm onSubmit={onSubmit} />
      {isLoading && <Preloader />}
      {!isLoading && <MoviesCardList isLoading={isLoading} />}
      <Footer />
    </>
  )
}

export default Movies
