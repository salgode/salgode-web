import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import axiosMiddleware from 'redux-axios-middleware'
import thunk from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import axios from 'axios'

// Reducers
import userReducer from './reducers/user'
import futureTripReducer from './reducers/trips'
import allFutureTripReducer from './reducers/allTrips'
import createTripReducer from './reducers/createTrip'
import spotsReducer from './reducers/spots'
import slotsReducer from './reducers/slots'
import updateUserReducer from './reducers/updateUser'
import vehiclesReducer from './reducers/vehicles'
import passengerTripsReducer from './reducers/passengerTrips'

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
})

const middlewares = [axiosMiddleware(client), thunk]
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducer = combineReducers({
  user: userReducer,
  futureTrips: futureTripReducer,
  allFutureTrips: allFutureTripReducer,
  createTrip: createTripReducer,
  spots: spotsReducer,
  slots: slotsReducer,
  form: formReducer,
  updateUser: updateUserReducer,
  loading: false,
  vehicles: vehiclesReducer,
  passengerTrips: passengerTripsReducer,
})

export const store = createStore(
  reducer,
  {
    user: userModel,
    createTrip: createTripModel,
    spots: spotsModel,
    futureTrips: futureTripsModel,
    vehicles: vehiclesModel,
  },
  composeEnhancer(applyMiddleware(...middlewares))
)
