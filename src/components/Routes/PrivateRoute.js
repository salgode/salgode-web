import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getObject, USER_DATA } from '../../utils/storeData'
import routes from '../../routes.js'

const PrivateRoute = ({ component: Component, ...rest }) => {
  // Add your own authentication on the below line.
  const isLoggedIn = getObject(USER_DATA)

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn.token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: routes.signIn, state: { from: props.location } }}
          />
        )
      }
    />
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  location: PropTypes.object,
}

export default PrivateRoute
