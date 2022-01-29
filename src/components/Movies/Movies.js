import React from 'react'
import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
import Preloader from '../Preloader/Preloader'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Footer from '../Footer/Footer'

import './Movies.css'

function Movies({
  loggedIn,
  isLoading,
  onSubmit,
  movies,
  onSave,
  savedMovies,
}) {
  const [checkBoxActive, setCheckBoxActive] = React.useState(false)

  const filterShortMovies = (filterMovies) =>
    filterMovies.filter((m) => m.duration < 40)

  function checkBoxClick() {
    setCheckBoxActive(!checkBoxActive)
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      <SearchForm onSubmit={onSubmit} checkBoxClick={checkBoxClick} />
      {isLoading && <Preloader />}
      {!isLoading && (
        <MoviesCardList
          isLoading={isLoading}
          movies={checkBoxActive ? filterShortMovies(movies) : movies}
          onSave={onSave}
          savedMovies={savedMovies}
        />
      )}
      <Footer />
    </>
  )
}

export default Movies
