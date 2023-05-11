import React from 'react'
import {
  Route,
  Switch,
  useHistory,
  Redirect,
  useLocation,
} from 'react-router-dom'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

// CSS
import './App.css'

// Components

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import Main from '../Main/Main'
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Register from '../Register/Register'
import Login from '../Login/Login'
import Profile from '../Profile/Profile'
import NotFound from '../NotFound/NotFound'

// API
import api from '../../utils/MainApi'
import moviesApi from '../../utils/MoviesApi'

function App() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const [currentUser, setCurrentUser] = React.useState({})

  // Фильмы
  const [allMovies, setAllMovies] = React.useState(
    JSON.parse(localStorage.getItem('loadedFilms')) || []
  )
  const [movies, setMovies] = React.useState([])
  const [savedMovies, setSavedMovies] = React.useState([])

  const [filteredMovies, setFilteredMovies] = React.useState(
    JSON.parse(localStorage.getItem('filteredMovies')) || []
  )

  const [searchKeyword, setSearchKeyword] = React.useState(
    localStorage.getItem('searchKeyword') || ''
  )

  const history = useHistory()
  const location = useLocation()

  // Проверка токена
  React.useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api
        .checkToken(token)
        .then(() => {
          setLoggedIn(true)
          history.push(location.pathname)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [])

  // Загрузка данных
  React.useEffect(() => {
    const token = localStorage.getItem('token')
    if (loggedIn) {
      api
        .getUser(token)
        .then((user) => {
          setCurrentUser(user)
        })
        .catch((err) => {
          console.error(err)
        })
      api
        .getMovies(token)
        .then((res) => {
          setSavedMovies(res)
          localStorage.setItem('savedMovies', JSON.stringify(res))
        })
        .catch((err) => {
          console.error(err)
        })

      moviesApi
        .getMovies()
        .then((data) => {
          setAllMovies(data)
          localStorage.setItem('loadedMovies', JSON.stringify(data))
        })
        .catch((err) => {
          console.log(err)
        })

      if (filteredMovies.length) {
        setMovies(filteredMovies)
      }
    }
  }, [filteredMovies, loggedIn])

  // Логин пользователя
  function handleLogin({ email, password }) {
    api
      .login(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token)
          setLoggedIn(true)
          history.push('/movies')
          setMessage('Успешно')
        }
      })
      .catch((err) => {
        setMessage('Произошла ошибка, попробуйте перезагрузить страницу.')
        console.log(err)
      })
      .finally(() => {
        setMessage('')
      })
  }

  // Регистрация пользователя
  function handleRegister({ name, email, password }) {
    api
      .register(name, email, password)
      .then((res) => {
        if (res) {
          handleLogin({ email, password })
          setCurrentUser(res)
          setMessage('Успешная регистрация')
        }
      })
      .catch((err) => {
        setMessage('Произошла ошибка, попробуйте перезагрузить страницу.')
        console.log(err)
      })
      .finally(() => {
        setMessage('')
      })
  }

  // Выход из аккаунта
  function handleSignOut() {
    localStorage.removeItem('token')
    localStorage.removeItem('loadedMovies')
    localStorage.removeItem('savedMovies')
    localStorage.removeItem('checkBox')
    localStorage.removeItem('searchKeyword')
    localStorage.removeItem('filteredMovies')
    setAllMovies([])
    setMovies([])
    setSavedMovies([])
    setCurrentUser({})
    setSearchKeyword('')
    setFilteredMovies([])
    setLoggedIn(false)
    setMessage('')

    history.push('/')
  }

  // Редактирование профиля
  function handleUpdateUser({ name, email }) {
    api
      .updateUser(name, email)
      .then((user) => {
        setMessage('Данные профиля успешно обновлены.')

        setCurrentUser(user)
      })
      .catch((err) => {
        setMessage('Произошла ошибка, попробуйте перезагрузить страницу.')
        console.log(err)
      })
      .finally(() => {
        setTimeout(() => setMessage(''), 1000)
      })
  }

  function searchMovies(movie, name) {
    return movie.filter((m) =>
      m.nameRU.toLowerCase().includes(name.toLowerCase())
    )
  }

  function handleSearchMovies(name) {
    setIsLoading(true)
    const newMovies = searchMovies(allMovies, name)
    setMovies(newMovies)
    localStorage.setItem('filteredMovies', JSON.stringify(newMovies))
    setFilteredMovies(newMovies)
    localStorage.setItem('searchKeyword', name)
    setSearchKeyword(name)
    setIsLoading(false)
  }

  // Поиск сохраненных фильмов
  function handleSearchSavedMovies(name) {
    const newSavedMovies = searchMovies(savedMovies, name)
    setSavedMovies(newSavedMovies)
  }

  // Сохранение фильма
  function handleSaveMovie(movie) {
    setIsLoading(true)
    api
      .saveMovie(movie)
      .then((data) => {
        setSavedMovies([data, ...savedMovies])
        localStorage.setItem(
          'savedMovies',
          JSON.stringify([data, ...savedMovies])
        )
      })

      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setTimeout(() => setIsLoading(false), 1000)
      })
  }

  // Удаление фильма из сохраненных
  function handleDeleteMovie(movie) {
    setIsLoading(true)
    const savedMovie = savedMovies.find(
      (item) => item.movieId === movie.movieId
    )
    api
      .deleteMovie(savedMovie._id)
      .then(() => {
        const newMoviesList = savedMovies.filter(
          (item) => item._id !== savedMovie._id
        )
        setSavedMovies(newMoviesList)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setTimeout(() => setIsLoading(false), 1000)
      })
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route exact path="/">
            <Main loggedIn={loggedIn} />
          </Route>

          {/* Профиль */}
          <ProtectedRoute
            exact
            path="/profile"
            loggedIn={loggedIn}
            component={Profile}
            onSignOut={handleSignOut}
            onUpdateUser={handleUpdateUser}
            message={message}
          />

          {/* Фильмы */}
          <ProtectedRoute
            exact
            path="/movies"
            isLoading={isLoading}
            loggedIn={loggedIn}
            component={Movies}
            movies={movies}
            savedMovies={savedMovies}
            onSubmit={handleSearchMovies}
            onSave={handleSaveMovie}
            onDelete={handleDeleteMovie}
            searchKeyword={searchKeyword}
          />
          {/* Сохраненные фильмы */}
          <ProtectedRoute
            exact
            path="/saved-movies"
            loggedIn={loggedIn}
            isLoading={isLoading}
            component={SavedMovies}
            movies={savedMovies}
            onSubmit={handleSearchSavedMovies}
            onDelete={handleDeleteMovie}
            savedMovies={savedMovies}
            searchKeyword={searchKeyword}
          />
          <Route exact path="/signup">
            {loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Register onRegister={handleRegister} message={message} />
            )}
          </Route>
          <Route exact path="/signin">
            {loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Login onLogin={handleLogin} message={message} />
            )}
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </CurrentUserContext.Provider>
    </div>
  )
}

export default App
