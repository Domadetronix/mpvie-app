/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
class MovieService {
  _apiBase = 'https://api.themoviedb.org/3/search/movie'

  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjRmMjA1MmMxZjQ1NmM1NjgyNzU1NjcwOWJkYTEyMyIsIm5iZiI6MTcxOTkxODEzNi45MTcxNjEsInN1YiI6IjY2M2NiYTM4NTgzYjU0YjIwYjFlY2Q4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MLmvcCqhyF4AgkazN6-6oxEhYTzLseWg1dny0s32YvE',
    },
  }

  async createGuest() {
    const res = await fetch('https://api.themoviedb.org/3/authentication/guest_session/new', this.options).catch(
      (e) => {
        console.log(e)
        throw new Error(e)
      }
    )
    // eslint-disable-next-line no-return-await
    return await res.json()
  }

  // подключаемся
  async getResource(url) {
    const res = await fetch(url, this.options)
    if (!res.ok) {
      throw new Error(`Couldn't fetch ${url}`)
    }
    // eslint-disable-next-line no-return-await
    return await res.json()
  }

  async getMovieGenres() {
    const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', this.options).catch((e) => {
      console.log(e)
      throw new Error(e)
    })
    // eslint-disable-next-line no-return-await
    return await res.json()
  }

  async getRatedMovies(page, guestSessionId) {
    const res = await fetch(
      `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?language=en-US&page=${page}&sort_by=created_at.asc`,
      this.options
    )
      .then(async (resolve) => {
        const object = await resolve.json()
        return object
      })
      .then((obj) => {
        if (obj.success === false) return []
        return obj.results
      })
      .catch((e) => {
        console.log(e)
        throw new Error(e)
      })
    return res
  }

  async addRating(guestSessionId, newRating, movieId) {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${guestSessionId}`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjRmMjA1MmMxZjQ1NmM1NjgyNzU1NjcwOWJkYTEyMyIsIm5iZiI6MTcxOTkxODEzNi45MTcxNjEsInN1YiI6IjY2M2NiYTM4NTgzYjU0YjIwYjFlY2Q4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MLmvcCqhyF4AgkazN6-6oxEhYTzLseWg1dny0s32YvE',
      },
      body: `{"value":${newRating}}`,
    })
  }

  // получаем все фильмы
  async getAllFilms(request, pageNum) {
    const res = await this.getResource(
      // eslint-disable-next-line no-underscore-dangle
      `${this._apiBase}?query=${request}&include_adult=false&language=en-US&page=${pageNum}`
    ).catch((err) => {
      throw new Error()
    })
    return res.results
  }

  async getImage(path) {
    const res = await fetch(`https://image.tmdb.org/t/p/w500${path}`)
      .then((ans) => {
        if (!ans.ok) {
          throw new Error('Не удалось получить изображение')
        } else return ans
      })
      .catch()
    const blob = await res.blob()
    const objectURL = URL.createObjectURL(blob)
    return objectURL
  }
}

const movieService = new MovieService()
export default movieService
