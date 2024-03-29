import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './styles/App.css'

import {
  SignIn,
  SignUp,
  ConfirmEmail,
  NotFound,
  RequestTrip,
  MyTrips,
  CreateTrip,
  Profile,
  RequestedTrip,
  UpdateUser,
  AddStops,
  PassengerTrips,
  MyTripDetails,
  TripProgress,
  LandingRedirect,
} from './screens'

import routes from './routes.js'
import NavbarWrapper from './components/Navbar/Navbar'
import PrivateRoute from './components/Routes/PrivateRoute'
import Container from '@material-ui/core/Container'

const App = () => {
  return (
    <div>
      <div className="App">
        <BrowserRouter>
          <NavbarWrapper />
          <Container className="appContainer">
            <Switch>
              <PrivateRoute exact path={routes.signIn} component={SignIn} />
              <PrivateRoute exact path={routes.signUp} component={SignUp} />
              <Route
                exact
                path={routes.confirmEmail}
                component={ConfirmEmail}
              />
              <Route exact path={routes.redirect} component={LandingRedirect} />
              <PrivateRoute
                exact
                path={routes.requestTrip}
                component={RequestTrip}
              />
              <PrivateRoute exact path={routes.myTrips} component={MyTrips} />
              <PrivateRoute
                path={routes.myTripDetails}
                component={MyTripDetails}
              />
              <PrivateRoute
                exact
                path={routes.createTrip}
                component={CreateTrip}
              />
              <PrivateRoute exact path={routes.profile} component={Profile} />
              <PrivateRoute
                exact
                path={routes.updateUser}
                component={UpdateUser}
              />
              <PrivateRoute
                exact
                path={routes.requestedTrip}
                component={RequestedTrip}
              />
              <PrivateRoute
                exact
                path={routes.passengerTrips}
                component={PassengerTrips}
              />
              <PrivateRoute exact path={routes.addStops} component={AddStops} />
              <PrivateRoute
                path={routes.currentTrip}
                component={TripProgress}
              />
              <PrivateRoute component={NotFound} />
            </Switch>
          </Container>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
