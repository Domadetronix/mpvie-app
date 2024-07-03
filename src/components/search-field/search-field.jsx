import React, { useState } from 'react'

import './search-field.css'

export default function SearchMovie({ debouncedFetchMovies, defaultText }) {
  const [text, setText] = useState([defaultText])
  const handleInputChange = (value) => {
    setText(value)
    debouncedFetchMovies(value)
  }
  return (
    <form
      className="search-field"
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <input
        className="search-field__text"
        placeholder="Type to search..."
        value={text}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        onChange={(event) => {
          handleInputChange(event.target.value)
        }}
      />
    </form>
  )
}
