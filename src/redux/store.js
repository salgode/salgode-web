import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import axiosMiddleware from 'redux-axios-middleware'
import axios from 'axios'
import thunk from 'redux-thunk'

// Reducers
import userReducer from './reducers/user'
import futureTripReducer from './reducers/trips'
import requestedTripsReducer from './reducers/requestedTrip'
import tripDetailsReducer from './reducers/tripDetails'
import allFutureTripReducer from './reducers/allTrips'
import createTripReducer from './reducers/createTrip'
import spotsReducer from './reducers/spots'
import slotsReducer from './reducers/slots'
import { reducer as formReducer } from 'redux-form'
import updateUserReducer from './reducers/updateUser'
import vehiclesReducer from './reducers/vehicles'

// Models
import { userModel } from './models/user'
import { futureTripsModel } from './models/trips'
import { createTripModel } from './models/createTrip'
import { spotsModel } from './models/spots'
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
