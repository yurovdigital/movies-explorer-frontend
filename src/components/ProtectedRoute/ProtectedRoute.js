import React, { Route, Redirect } from 'react-router-dom'

function ProtectedRoute({ component: Component, ...props }) {
  return (
    <Route>
      {() =>
        // eslint-disable-next-line react/jsx-props-no-spreading
        props.loggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    </Route>
  )
}

export default ProtectedRoute
