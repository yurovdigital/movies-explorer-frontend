import React from 'react'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import './SearchForm.css'

function SearchForm({ onSubmit }) {
  const [movie, setMovie] = React.useState('')

  function handleChange(evt) {
    setMovie(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.prevent.default()

    onSubmit(movie)
  }

  React.useEffect(() => {
    setMovie('')
  }, [onSubmit])

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
        <FilterCheckbox />
      </div>
    </section>
  )
}

export default SearchForm
