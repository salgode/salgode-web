import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import axiosMiddleware from 'redux-axios-middleware'
import thunk from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import axios from 'axios'

// Reducers
import userReducer from './reducers/user'
import futureTripReducer from './reducers/trips'
import requestedTripsReducer from './reducers/requestedTrip'
import tripDetailsReducer from './reducers/tripDetails'
import allFutureTripReducer from './reducers/allTrips'
import createTripReducer from './reducers/createTrip'
import spotsReducer from './reducers/spots'
import slotsReducer from './reducers/slots'
import updateUserReducer from './reducers/updateUser'
import vehiclesReducer from './reducers/vehicles'
import passengerTripsReducer from './reducers/passengerTrips'
import requestedTripsReducer from './reducers/requestedTrip'

// Models
import { createTripModel } from './models/createTrip'
import { spotsModel } from './models/spots'
import { futureTripsModel } from './models/trips'
import { userModel } from './models/user'
import { vehiclesModel } from './models/vehicles'

export const client = axios.create({
  baseURL: 'https://playground-api.salgode.com',
  responseType: 'json',
  requestType: 'json',
  headers: {
    Authorization: 'Bearer 12345',
  },
})

const middlewares = [axiosMiddleware(client), thunk]
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducer = combineReducers({
  user: userReducer,
  futureTrips: futureTripReducer,
  requestedTrips: requestedTripsReducer,
  tripDetails: tripDetailsReducer,
  allFutureTrips: allFutureTripReducer,
  createTrip: createTripReducer,
  spots: spotsReducer,
  slots: slotsReducer,
  form: formReducer,
  updateUser: updateUserReducer,
  loading: false,
  vehicles: vehiclesReducer,
  passengerTrips: passengerTripsReducer,
  requestedTrips: requestedTripsReducer,
})

export const store = createStore(
  reducer,
  {
    user: userModel,
    futureTrips: futureTripsModel,
    createTrip: createTripModel,
    spots: spotsModel,
    vehicles: vehiclesModel,
  },
  composeEnhancer(applyMiddleware(...middlewares))
)
