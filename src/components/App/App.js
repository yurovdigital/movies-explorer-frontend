import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import Main from '../Main/Main'
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Register from '../Register/Register'
import Login from '../Login/Login'
import Profile from '../Profile/Profile'
import NotFound from '../NotFound/NotFound'

const movies = [
  {
    movieId: 0,
    nameRu: 'В погоне за Бэнкси',
    duration: 100,
    image: 'https://picsum.photos/342/190',
    owner: false,
  },
  {
    movieId: 1,
    nameRu: 'В погоне за Бэнкси',
    duration: 100,
    image: 'https://picsum.photos/200/200',
    owner: false,
  },
  {
    movieId: 2,
    nameRu: 'В погоне за Бэнкси',
    duration: 100,
    image: 'https://picsum.photos/200/200',
    owner: true,
  },
  {
    movieId: 3,
    nameRu: 'В погоне за Бэнкси',
    duration: 100,
    image: 'https://picsum.photos/100/100',
    owner: true,
  },
  {
    movieId: 4,
    nameRu: 'В погоне за Бэнкси',
    duration: 100,
    image: 'https://picsum.photos/300/200',
    owner: true,
  },
  {
    movieId: 5,
    nameRu: 'В погоне за Бэнкси',
    duration: 100,
    image: 'https://picsum.photos/342/190',
    owner: false,
  },
  {
    movieId: 6,
    nameRu: 'В погоне за Бэнкси',
    duration: 100,
    image: 'https://picsum.photos/342/190',
    owner: false,
  },
  {
    movieId: 7,
    nameRu: 'В погоне за Бэнкси',
    duration: 100,
    image: 'https://picsum.photos/342/190',
    owner: false,
  },
  {
    movieId: 8,
    nameRu: 'В погоне за Бэнкси',
    duration: 100,
    image: 'https://picsum.photos/342/190',
    owner: false,
  },
  {
    movieId: 9,
    nameRu: 'В погоне за Бэнкси',
    duration: 100,
    image: 'https://picsum.photos/342/190',
    owner: false,
  },
  {
    movieId: 10,
    nameRu: 'В погоне за Бэнкси',
    duration: 100,
    image: 'https://picsum.photos/342/190',
    owner: false,
  },
  {
    movieId: 11,
    nameRu: 'В погоне за Бэнкси',
    duration: 100,
    image: 'https://picsum.photos/342/190',
    owner: false,
  },
  {
    movieId: 12,
    nameRu: 'В погоне за Бэнкси',
    duration: 100,
    image: 'https://picsum.photos/342/190',
    owner: false,
  },
]

function App() {
  const isLoggedIn = true
  const isLoading = false
  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Main isLoggedIn={false} />
        </Route>
        <Route path="/profile">
          <Profile isLoggedIn={isLoggedIn} />
        </Route>
        <Route path="/movies">
          <Movies
            isLoggedIn={isLoggedIn}
            isLoading={isLoading}
            movies={movies}
          />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies isLoggedIn={isLoggedIn} movies={movies} />
        </Route>
        <Route exact path="/signup">
          <Register />
        </Route>
        <Route exact path="/signin">
          <Login />
        </Route>

        <Route path="/*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  )
}

export default App
