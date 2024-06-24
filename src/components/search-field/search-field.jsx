/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { debounce } from 'lodash'

import './search-field.css'

export default function SearchMovie({ request, setRequest }) {
  const handleInputChanges = (value) => {
    setRequest(value)
    debouncedGetResponse()
  }

  const debouncedGetRequest = debounce((text) => setRequest(text), 2000)
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <form className="search-field" onSubmit={console.log(request)}>
      <input
        className="search-field__text"
        placeholder="Type to search..."
        value={request}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        onChange={(event) => handleInputChanges(event.target.value)}
      />
    </form>
  )
}
