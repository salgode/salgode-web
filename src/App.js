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
} from './screens'

import UpdateUser from './screens/UpdateUser'
import Navbar from './components/Navbar/Navbar'
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
              <Route exact path="/find-trip" component={RequestTrip} />
              <Route exact path="/my-trips" component={MyTrips} />
              <Route exact path="/create-trip" component={CreateTrip} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/profile/edit" component={UpdateUser} />
              <Route exact path="/requested-trip" component={RequestedTrip} />
              <Route component={NotFound} />
            </Switch>
          </Container>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
