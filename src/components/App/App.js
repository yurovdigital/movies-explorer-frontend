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
  // const [isLoading, setIsLoading] = React.useState(false)
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const [currentUser, setCurrentUser] = React.useState({})

  // Фильмы
  const [movies, setMovies] = React.useState([])
  const [savedMovies, setSavedMovies] = React.useState([])

  const history = useHistory()

  // Загрузка данных
  React.useEffect(() => {
    if (loggedIn) {
      api
        .getUser()
        .then((user) => {
          setCurrentUser(user.data)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [loggedIn])

  React.useEffect(() => {
    api
      .getMovies()
      .then((res) => {
        setSavedMovies(res.filter((movie) => movie.owner === currentUser._id))
        localStorage.setItem('savedMovies', JSON.stringify(res))
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

  function searchMovies(movie, name) {
    return movie.filter(
      (m) => m.nameRU.toLowerCase().indexOf(name.toLowerCase()) !== -1
    )
  }

  function handleSearchMovies(name) {
    moviesApi
      .getMovies()
      .then((res) => {
        const newMovies = searchMovies(res, name)
        setMovies(newMovies)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  // function handleSearchSavedMovies(name) {
  //   const searchSavedMovies = JSON.parse(localStorage.getItem('savedMovies'))
  //   const foundSavedMovies = searchSavedMovies.filter((c) =>
  //     c.nameRU.toLowerCase().includes(name.toLowerCase())
  //   )
  //   if (foundSavedMovies.length === 0) {
  //     setMessage('Ничего не найдено.')
  //   } else {
  //     setSavedMovies(foundSavedMovies)
  //     setMessage('')
  //   }
  // }

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
            loggedIn={loggedIn}
            component={Movies}
            movies={movies}
            onSubmit={handleSearchMovies}
          />
          {/* Сохраненные фильмы */}
          <ProtectedRoute
            exact
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
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
