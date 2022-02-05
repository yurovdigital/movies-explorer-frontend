import React from 'react'

import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
import Preloader from '../Preloader/Preloader'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Footer from '../Footer/Footer'

function SavedMovies({
  movies,
  loggedIn,
  isLoading,
  onSubmit,
  onDelete,
  savedMovies,
  searchKeyword,
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
      <SearchForm
        onSubmit={onSubmit}
        checkBoxClick={checkBoxClick}
        searchKeyword={searchKeyword}
      />
      {isLoading && <Preloader />}
      {!isLoading && (
        <MoviesCardList
          movies={checkBoxActive ? filterShortMovies(movies) : movies}
          onDelete={onDelete}
          savedMovies={savedMovies}
        />
      )}
      <Footer />
    </>
  )
}

export default SavedMovies
