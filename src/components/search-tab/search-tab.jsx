import { useCallback, useContext, useState } from 'react'
import { debounce } from 'lodash'
import { Pagination } from 'antd'

import useFetchData from '../../services/useFetchData'
import movieService from '../../services/movie-service'
import MoviesList from '../movies-list/movie-list'
import Loader from '../loader/loader'
import SearchMovie from '../search-field/search-field'
import Context from '../../context'

export default function SearchTab() {
  const [request, setRequest] = useState('return')
  const [pageNum, setPageNum] = useState('1')
  const getAllFilms = movieService.getAllFilms.bind(movieService)
  const { setCriticalError } = useContext(Context)
  const debouncedFetchMovies = useCallback(
    debounce((newRequest) => {
      setRequest(newRequest)
    }, 1000),
    []
  )
  function handlePageNum(e) {
    setPageNum(e)
  }
  const { data: movieList, isLoading, error } = useFetchData(getAllFilms, [request, pageNum])
  if (error) setCriticalError(true)
  return (
    <div className="search-tab">
      <SearchMovie debouncedFetchMovies={debouncedFetchMovies} defaultText={request} />
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
            // eslint-disable-next-line no-undef
            handlePageNum(page)
          }}
        />
      </div>
    </div>
  )
}
