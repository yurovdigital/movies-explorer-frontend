import React from 'react'
import { Route, Switch, useHistory, Redirect } from 'react-router-dom'
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

  const history = useHistory()

  // Загрузка данных
  React.useEffect(() => {
    if (loggedIn) {
      api
        .getUser()
        .then((user) => {
          setCurrentUser(user)
        })
        .catch((error) => {
          console.error(error)
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
    }
  }, [loggedIn])

  // Загрузка сохраненных фильмов
  React.useEffect(() => {
    api
      .getMovies()
      .then((res) => {
        const savedArray = res.map((item) => item)
        setSavedMovies(savedArray)
        localStorage.setItem('savedMovies', JSON.stringify(savedArray))
      })
      .catch((error) => {
        console.error(error)
      })
  }, [currentUser])

  // Проверка токена
  const checkToken = React.useCallback(() => {
    api
      .checkToken()
      .then((data) => {
        setLoggedIn(true)
        setCurrentUser(data)
        history.push('/movies')
      })
      .catch((err) => {
        console.log(err)
      })
  }, [history])

  React.useEffect(() => {
    checkToken()
  }, [checkToken])

  // Регистрация пользователя
  function handleRegister({ name, email, password }) {
    api
      .register(name, email, password)
      .then((user) => {
        if (user) {
          setMessage('Успешная регистрация')
          setCurrentUser(user)
          history.push('/signin')
        }
      })
      .catch((err) => {
        setMessage('Произошла ошибка, попробуйте перезагрузить страницу.')
        console.log(err)
      })
  }

  // Логин пользователя
  function handleLogin({ email, password }) {
    api
      .login(email, password)
      .then((res) => {
        if (res.token) {
          setLoggedIn(true)
          localStorage.setItem('token', res.token)
          history.push('/movies')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Выход из аккаунта
  function handleSignOut() {
    localStorage.removeItem('token')
    localStorage.removeItem('savedMovies')
    localStorage.removeItem('movies')
    history.push('/')
  }

  // Редактирование профиля
  function handleUpdateUser({ name, email }) {
    api
      .updateUser(name, email)
      .then((user) => {
        setCurrentUser(user)
        setMessage('Данные профиля успешно обновлены.')
      })
      .catch((err) => {
        console.log(err)
        setMessage('Произошла ошибка, попробуйте перезагрузить страницу.')
      })
  }
  // Поиск фильмов
  function searchMovies(movie, name) {
    return movie.filter(
      (m) => m.nameRU.toLowerCase().indexOf(name.toLowerCase()) !== -1
    )
  }

  function handleSearchMovies(name) {
    setIsLoading(true)
    if (allMovies.length) {
      const newMovies = searchMovies(allMovies, name)
      setMovies(newMovies)
      setIsLoading(false)
      return
    }

    moviesApi
      .getMovies()
      .then((res) => {
        localStorage.setItem('loadedFilms', JSON.stringify(res))
        const newMovies = searchMovies(res, name)
        setAllMovies(res)
        setMovies(newMovies)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  // Сохранение фильма
  function handleSaveMovie(movie) {
    setIsLoading(true)
    api
      .saveMovie(movie)
      .then((item) => {
        setSavedMovies([item, ...savedMovies])
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  // Удаление фильма из сохраненных
  function handleMovieDelete(movie) {
    const savedMovie = savedMovies.find((item) => item._id === movie._id)
    api
      .deleteMovie(savedMovie._id)
      .then(() => {
        const newMoviesList = savedMovies.filter(
          (item) => savedMovie.id !== item.id
        )
        setSavedMovies(newMoviesList)
      })
      .catch((err) => {
        console.log(err)
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
          />
          {/* Сохраненные фильмы */}
          <ProtectedRoute
            exact
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
            movies={savedMovies}
            onDelete={handleMovieDelete}
            savedMovies={savedMovies}
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
