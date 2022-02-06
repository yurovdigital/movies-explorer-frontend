import React from 'react'
import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
import Preloader from '../Preloader/Preloader'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Footer from '../Footer/Footer'

import './Movies.css'

import { SHORT_MOVIE_DURATION } from '../../utils/constants'

function Movies({
  loggedIn,
  isLoading,
  onSubmit,
  movies,
  onSave,
  onDelete,
  savedMovies,
  searchKeyword,
}) {
  const [checkBoxActive, setCheckBoxActive] = React.useState(false)
  const [isShort, setIsShort] = React.useState(false)

  function checkBoxClick() {
    setCheckBoxActive(!checkBoxActive)
    localStorage.setItem('checkBox', !checkBoxActive)
  }

  React.useEffect(() => {
    const checkBoxLocal = localStorage.getItem('checkBox')
    if (checkBoxLocal === 'true') {
      setIsShort(isShort)
      setCheckBoxActive(true)
    }
  }, [])

  const filterShortMovies = (filterMovies) =>
    filterMovies.filter((m) => m.duration < SHORT_MOVIE_DURATION)

  return (
    <>
      <Header loggedIn={loggedIn} />
      <SearchForm
        onSubmit={onSubmit}
        checkBoxClick={checkBoxClick}
        searchKeyword={searchKeyword}
        isShort={checkBoxActive}
      />
      {isLoading && <Preloader />}
      {!isLoading && (
        <MoviesCardList
          movies={checkBoxActive ? filterShortMovies(movies) : movies}
          onSave={onSave}
          onDelete={onDelete}
          savedMovies={savedMovies}
          checkBox={checkBoxClick}
        />
      )}
      <Footer />
    </>
  )
}

export default Movies
