import React from 'react'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import './SearchForm.css'

function SearchForm() {
  return (
    <section className="search-form">
      <div className="search-form__wrapper">
        <form className="search-form__form">
          <input
            className="search-form__input"
            type="search"
            name="search"
            placeholder="Фильм"
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
