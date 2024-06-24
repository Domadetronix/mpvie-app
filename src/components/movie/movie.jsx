import React from 'react'
import './movie.css'
import { format } from 'date-fns'

import useFetchRequest from '../../services/useFetchRequest'
import Loader from '../loader/loader'
import MovieService from '../../services/movie-service'
import ErrorMessage from '../error/error'

// import Loader from '../loader/loader'

// import MovieService from '../../services/movie-service'

// const movieService = new MovieService()
export default function Movie({ movie }) {
  function shortText(text) {
    return `${text.split(' ').reduce((a, b) => ((a + b).length < 150 ? `${a} ${b}` : a))}...`
  }
  function formatDate(date) {
    if (!date) return 'Дата выхода неизвестна'
    return format(movie.release_date, 'PP')
  }
  const movieService = new MovieService()
  const getImage = movieService.getImage.bind(movieService)
  const { data: poster, error, isLoading } = useFetchRequest(getImage, [movie.poster_path])

  return (
    <div className="movie-list__item movie-item">
      <div className="movie-image">
        {isLoading && <Loader />}
        {!isLoading && error ? <ErrorMessage description={error.message} /> : ''}
        {!isLoading && !error && <img className="poster" alt="poster" src={poster} />}
      </div>
      <div className="movie-info">
        <div className="movie-info__main-block">
          <div className="movie-info__name">{movie.title}</div>
          <div className="movie-info__rating">
            <span> {Math.round(movie.vote_average * 10) / 10}</span>
          </div>
        </div>
        <div className="movie-info__date">{/*  */ formatDate(movie.release_date)}</div>
        <div className="movie-info__genres">{movie.genre_ids}</div>
        <div className="movie-info__description">{shortText(movie.overview)}</div>
      </div>
    </div>
  )
}
