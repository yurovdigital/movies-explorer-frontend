import React from 'react'
import { useLocation } from 'react-router-dom'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import './SearchForm.css'

function SearchForm({ onSubmit, checkBoxClick, searchKeyword, isShort }) {
  const [movie, setMovie] = React.useState('')

  const location = useLocation()

  React.useEffect(() => {
    if (searchKeyword.length && location.pathname === '/movies') {
      setMovie(searchKeyword)
    }
  }, [])

  function handleChange(evt) {
    setMovie(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault()

    onSubmit(movie)
  }

  return (
    <section className="search-form">
      <div className="search-form__wrapper">
        <form className="search-form__form" onSubmit={handleSubmit}>
          <input
            className="search-form__input"
            type="search"
            name="search"
            placeholder="Фильм"
            onChange={handleChange}
            value={movie}
            required
          />
          <button className="search-form__button" type="submit">
            Найти
          </button>
        </form>
        <FilterCheckbox checkBoxClick={checkBoxClick} isShort={isShort} />
      </div>
    </section>
  )
}

export default SearchForm
