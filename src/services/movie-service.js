/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
export default class MovieService {
  _apiBase = 'https://api.themoviedb.org/3/search/movie'

  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjRmMjA1MmMxZjQ1NmM1NjgyNzU1NjcwOWJkYTEyMyIsInN1YiI6IjY2M2NiYTM4NTgzYjU0YjIwYjFlY2Q4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dV3bXXiPGRWZs3-eGhmtToGCacksJo5hP5h2D5F7QfQ',
    },
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

  // получаем все фильмы
  async getAllFilms(arg = 'return') {
    // eslint-disable-next-line no-underscore-dangle
    const res = await this.getResource(`${this._apiBase}?query=${arg}&include_adult=false&language=en-US&page=1`)
    // if (!res.ok) {
    //   throw new Error('Упс.. Проблемы с соединением')
    // }
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
