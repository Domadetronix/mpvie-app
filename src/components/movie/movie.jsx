/* eslint-disable no-nested-ternary */
import React, { useContext } from 'react'
import './movie.css'
import { format } from 'date-fns'
import { Rate } from 'antd'

import Loader from '../loader/loader'
import movieService from '../../services/movie-service'
import ErrorMessage from '../error/error'
import useFetchData from '../../services/useFetchData'
import Context from '../../context'

export default function Movie({ movie }) {
  function shortText(text) {
    return `${text.split(' ').reduce((a, b) => ((a + b).length < 150 ? `${a} ${b}` : a))}...`
  }

  function formatDate(date) {
    if (!date) return 'Дата выхода неизвестна'
    return format(new Date(date), 'PP')
  }

  const { genres, guestId, ratedMovies, setRatedMovies } = useContext(Context)
  const getImage = movieService.getImage.bind(movieService)
  const { data: poster, isLoading, error } = useFetchData(getImage, [movie.poster_path])

  function getGenreName(id) {
    const gName = genres.reduce((acc, obj) => {
      if (obj.id === id) {
        return acc + obj.name
      }
      return acc
    }, '')
    return gName
  }

  const handleRateScore = (newRating) => {
    movieService.addRating(guestId, newRating, movie.id)
    const previousRatedList = ratedMovies
    previousRatedList.set(movie.id, newRating)
    setRatedMovies(previousRatedList)
    console.log(ratedMovies)
    console.log(`newRating - ${newRating}; movie.id - ${movie.id}`)
  }

  const rating = Math.round(movie.vote_average * 10) / 10

  function detectUserRating() {
    const currentId = movie.id
    if (ratedMovies.has(currentId)) {
      return ratedMovies.get(currentId)
    }
    console.log()
    return 0
  }

  return (
    <div className="movie-list__item movie-item">
      <div className="movie-image">
        {isLoading && <Loader />}
        {!isLoading && error && <ErrorMessage description={error.message} />}
        {!isLoading && !error && <img className="poster" alt="poster" src={poster} />}
      </div>
      <div className="movie-info movie-info_first">
        <div className="movie-info__main-block">
          <div className="movie-info__name">{movie.title}</div>
          <div
            className={
              rating < 3
                ? 'movie-info__rating movie-info__rating_terrible'
                : rating < 5
                  ? 'movie-info__rating movie-info__rating_bad'
                  : rating < 7
                    ? 'movie-info__rating movie-info__rating_good'
                    : 'movie-info__rating movie-info__rating_perfect'
            }
          >
            <span>{rating}</span>
          </div>
        </div>
        <div className="movie-info__date">{formatDate(movie.release_date)}</div>
        <div className="movie-info__genres">
          {movie.genre_ids.map((id) => (
            <span key={movie.id && id} className="genre-name">
              {getGenreName(id)}
            </span>
          ))}
        </div>
      </div>
      <div className="movie-info movie-info_second">
        <div className="movie-info__description">{shortText(movie.overview)}</div>
        <Rate
          defaultValue={detectUserRating()}
          onChange={(value) => {
            handleRateScore(value)
          }}
          allowHalf
          count={10}
        />
      </div>
    </div>
  )
}
