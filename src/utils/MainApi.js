import { MAIN_API, MOVIES_URL } from './constants'

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }

  // eslint-disable-next-line class-methods-use-this
  _handleResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(res.status)
  }

  register(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }).then(this._handleResponse)
  }

  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(this._handleResponse)
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    }).then(this._handleResponse)
  }

  getUser(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    }).then(this._handleResponse)
  }

  updateUser(name, email) {
    const token = localStorage.getItem('token')

    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify({
        name,
        email,
      }),
    }).then(this._handleResponse)
  }

  getMovies(token) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    }).then(this._handleResponse)
  }

  saveMovie(movie) {
    const token = localStorage.getItem('token')

    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `${MOVIES_URL}${movie.image.url}`,
        trailer: movie.trailerLink,
        thumbnail: `${MOVIES_URL}${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    }).then(this._handleResponse)
  }

  deleteMovie(movieId) {
    const token = localStorage.getItem('token')

    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    }).then(this._handleResponse)
  }
}

const api = new Api({
  baseUrl: MAIN_API,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
