import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import axiosMiddleware from 'redux-axios-middleware'
import thunk from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import axios from 'axios'

// Reducers
import userReducer from './reducers/user'
import futureTripReducer from './reducers/trips'
import tripDetailsReducer from './reducers/tripDetails'
import tripManifestReducer from './reducers/tripManifest'
import findTripsReducer from './reducers/findTrips'
import createTripReducer from './reducers/createTrip'
import spotsReducer from './reducers/spots'
import slotsReducer from './reducers/slots'
import updateUserReducer from './reducers/updateUser'
import vehiclesReducer from './reducers/vehicles'
import passengerTripsReducer from './reducers/passengerTrips'
import requestedTripsReducer from './reducers/requestedTrip'
import tripReservationsReducer from './reducers/tripReservations'

// Models
import { createTripModel } from './models/createTrip'
import { spotsModel } from './models/spots'
import { futureTripsModel } from './models/trips'
import { userModel } from './models/user'
import { vehiclesModel } from './models/vehicles'
import { findTripsModel } from './models/findTrips'
import currentTripReducer from './reducers/currentTrip'
import { currentTripModel } from './models/currentTrip'

export const client = axios.create({
  baseURL: 'https://api.salgode.com/',
  responseType: 'json',
  requestType: 'json',
})

const middlewares = [axiosMiddleware(client), thunk]
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducer = combineReducers({
  user: userReducer,
  futureTrips: futureTripReducer,
  tripDetails: tripDetailsReducer,
  tripManifest: tripManifestReducer,
  createTrip: createTripReducer,
  spots: spotsReducer,
  slots: slotsReducer,
  form: formReducer,
  updateUser: updateUserReducer,
  currentTrip: currentTripReducer,
  loading: false,
  vehicles: vehiclesReducer,
  passengerTrips: passengerTripsReducer,
  requestedTrips: requestedTripsReducer,
  tripReservations: tripReservationsReducer,
  findTrips: findTripsReducer,
})

export const store = createStore(
  reducer,
  {
    user: userModel,
    createTrip: createTripModel,
    spots: spotsModel,
    futureTrips: futureTripsModel,
    vehicles: vehiclesModel,
    findTrips: findTripsModel,
    currentTrip: currentTripModel,
  },
  composeEnhancer(applyMiddleware(...middlewares))
)
