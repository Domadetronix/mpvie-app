/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-constructed-context-values */
import { useState } from 'react'
import './App.css'
import { Offline, Online } from 'react-detect-offline'

import useFetchRequest from '../../services/useFetchRequest'
import MovieService from '../../services/movie-service'
import MoviesList from '../movies-list/movie-list'
import Context from '../../context'
import Loader from '../loader/loader'
import ErrorMessage from '../error/error'
import SearchMovie from '../search-field/search-field'

export default function App() {
  const [request, setRequest] = useState('return')
  const movieService = new MovieService()
  const getAllFilms = movieService.getAllFilms.bind(movieService)
  console.log('отправляю запрос')
  const { data: movieList, error, isLoading } = useFetchRequest(getAllFilms, [request])

  return (
    <div className="app-container">
      <Online>
        <Context.Provider
          value={{
            movieList,
          }}
        >
          <SearchMovie request={request} setRequest={setRequest} />
          <div className="app">
            {isLoading && <Loader />}
            {!isLoading && error}
            {!isLoading && <MoviesList />}
          </div>
        </Context.Provider>
      </Online>
      <Offline>
        <ErrorMessage description="Проверьте подключение к интернету" />
      </Offline>
    </div>
  )
}
