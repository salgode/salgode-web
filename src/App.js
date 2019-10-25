import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './styles/App.css'

import {
  SignIn,
  SignUp,
  NotFound,
  RequestTrip,
  MyTrips,
  CreateTrip,
  Profile,
  RequestedTrip,
  UpdateUser,
} from './screens'

import Navbar from './components/Navbar/Navbar'
import PrivateRoute from './components/Routes/PrivateRoute'
import Container from '@material-ui/core/Container'

const App = () => {
  return (
    <div>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Container className="appContainer">
            <Switch>
              <Route exact path="/" component={SignIn} />
              <Route exact path="/sign-up" component={SignUp} />
              <PrivateRoute exact path="/find-trip" component={RequestTrip} />
              <PrivateRoute exact path="/my-trips" component={MyTrips} />
              <PrivateRoute exact path="/create-trip" component={CreateTrip} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/profile/edit" component={UpdateUser} />
              <PrivateRoute
                exact
                path="/requested-trip"
                component={RequestedTrip}
              />
              <Route component={NotFound} />
            </Switch>
          </Container>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
