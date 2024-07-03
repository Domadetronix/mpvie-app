import React from 'react'

import Movie from '../movie/movie'
import './movie-list.css'

export default function MoviesList({ movieList }) {
  console.log(movieList)
  if (movieList.length === 0) return <div className="empty-message">По вашему запросу не найдено результатов</div>
  return (
    <div className="movie-list">
      {movieList.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </div>
  )
}
