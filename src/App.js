import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './styles/App.css'

import {
  Home,
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
              <Route exact path="/" component={Home} />
              <Route exact path="/pedir-viaje" component={RequestTrip} />
              <Route exact path="/mis-viajes" component={MyTrips} />
              <Route exact path="/crear-viaje" component={CreateTrip} />
              <Route exact path="/perfil" component={Profile} />
              <Route exact path="/perfil/editar" component={UpdateUser} />
              <Route exact path="/sign-in" component={SignIn} />
              <Route exact path="/sign-up" component={SignUp} />
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
