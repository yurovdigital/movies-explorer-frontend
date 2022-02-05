import React from 'react'
import './FilterCheckbox.css'

function FilterCheckbox({ checkBoxClick, isShort }) {
  return (
    <div className="checkbox__wrapper">
      <label className="switch">
        <input
          className="checkbox"
          type="checkbox"
          onChange={checkBoxClick}
          checked={isShort}
        />
        <span className="slider round" />
      </label>
      <p className="checkbox__text">Короткометражки</p>
    </div>
  )
}

export default FilterCheckbox
