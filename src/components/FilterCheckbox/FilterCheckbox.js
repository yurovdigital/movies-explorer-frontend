import React from 'react'
import './FilterCheckbox.css'

function FilterCheckbox({ checkBoxClick }) {
  return (
    <div className="checkbox__wrapper">
      <label className="switch">
        <input className="checkbox" type="checkbox" onClick={checkBoxClick} />
        <span className="slider round" />
      </label>
      <p className="checkbox__text">Короткометражки</p>
    </div>
  )
}

export default FilterCheckbox
