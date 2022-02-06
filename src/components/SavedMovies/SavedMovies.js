import React from 'react'

import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
import Preloader from '../Preloader/Preloader'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Footer from '../Footer/Footer'

import { SHORT_MOVIE_DURATION } from '../../utils/constants'

function SavedMovies({
  // movies,
  loggedIn,
  isLoading,
  // onSubmit,
  onDelete,
  savedMovies,
  searchKeyword,
}) {
  const [checkBoxActive, setCheckBoxActive] = React.useState(false)
  const [filter, setFilter] = React.useState('')

  const filterShortMovies = (filterMovies) =>
    filterMovies.filter((m) => m.duration < SHORT_MOVIE_DURATION)

  function checkBoxClick() {
    setCheckBoxActive(!checkBoxActive)
  }

  const filteredMovies = React.useMemo(
    () =>
      savedMovies.filter((m) =>
        m.nameRU.toLowerCase().includes(filter.toLowerCase())
      ),
    [filter, savedMovies]
  )

  return (
    <>
      <Header loggedIn={loggedIn} />
      <SearchForm
        onSubmit={setFilter}
        checkBoxClick={checkBoxClick}
        searchKeyword={searchKeyword}
      />
      {isLoading && <Preloader />}
      {!isLoading && (
        <MoviesCardList
          movies={
            checkBoxActive ? filterShortMovies(filteredMovies) : filteredMovies
          }
          onDelete={onDelete}
          savedMovies={savedMovies}
        />
      )}
      <Footer />
    </>
  )
}

export default SavedMovies
