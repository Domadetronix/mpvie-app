/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useEffect, useState } from 'react'
import './app.css'
import { Offline, Online } from 'react-detect-offline'

import TabsComp from '../tabs/tabs'
import ErrorMessage from '../error/error'
import movieService from '../../services/movie-service'
import Context from '../../context'

export default function App() {
  const [genres, setGenres] = useState([])
  const [guestId, setGuestId] = useState('')
  const [criticalError, setCriticalError] = useState(false)
  const [ratedMovies, setRatedMovies] = useState(new Map())

  useEffect(() => {
    try {
      movieService.createGuest().then((res) => {
        setGuestId(res.guest_session_id)
      })
      movieService.getMovieGenres().then((res) => setGenres(res.genres))
    } catch (e) {
      setCriticalError(true)
      console.log(e)
    }
  }, [])
  if (criticalError) {
    console.log('critical error')
    return <ErrorMessage description="Произошла ошибка, попробуйте включить vpn" />
  }
  return (
    <div className="app-container">
      <Online>
        <Context.Provider value={{ genres, guestId, ratedMovies, setRatedMovies, setCriticalError }}>
          <TabsComp />
        </Context.Provider>
      </Online>
      <Offline>
        <ErrorMessage description="Проверьте подключение к интернету" />
      </Offline>
    </div>
  )
}
