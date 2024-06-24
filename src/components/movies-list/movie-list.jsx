import React, { useContext } from 'react'

import Movie from '../movie/movie'
import Context from '../../context'
import './movie-list.css'

export default function MoviesList() {
  const { movieList } = useContext(Context)

  return (
    <div className="movie-list">
      {movieList.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </div>
  )
}
