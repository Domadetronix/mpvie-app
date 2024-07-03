import { useContext, useState } from 'react'
import { Pagination } from 'antd'

import useFetchData from '../../services/useFetchData'
import movieService from '../../services/movie-service'
import MoviesList from '../movies-list/movie-list'
import Loader from '../loader/loader'
import Context from '../../context'

export default function RatedTab() {
  const getRatedMovies = movieService.getRatedMovies.bind(movieService)
  const [pageNum, setPageNum] = useState('1')
  const { guestId } = useContext(Context)
  function handlePageNum(e) {
    setPageNum(e)
  }
  const { data: movieList, isLoading, error } = useFetchData(getRatedMovies, [pageNum, guestId])

  return (
    <div className="search-tab">
      <div className="app">
        {isLoading && <Loader />}
        {!isLoading && error}
        {!isLoading && <MoviesList movieList={movieList} />}
      </div>
      <div className="pagination">
        <Pagination
          current={pageNum}
          defaultCurrent={1}
          total={50}
          onChange={(page) => {
            handlePageNum(page)
          }}
        />
      </div>
    </div>
  )
}
