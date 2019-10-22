import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './styles/App.css'

import {
  Home,
  SignIn,
  SignUp,
  NotFound,
  FindTrip,
  MyTrips,
  CreateTrip,
} from './screens'
import Navbar from './components/Navbar/Navbar'

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/buscar-viaje" component={FindTrip} />
            <Route exact path="/mis-viajes" component={MyTrips} />
            <Route exact path="/crear-viaje" component={CreateTrip} />
            <Route exact path="/sign-in" component={SignIn} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
