import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import axiosMiddleware from 'redux-axios-middleware'
import axios from 'axios'
import userReducer from './reducers/user'
import futureTripReducer from './reducers/trips'
import allFutureTripReducer from './reducers/allTrips'
import { userModel } from './models/user'
import { futureTripsModel } from './models/trips'
import createTripReducer from './reducers/createTrip'
import spotsReducer from './reducers/spots'
import { createTripModel } from './models/createTrip'
import { spotsModel } from './models/spots'
import slotsReducer from './reducers/slots'
import { reducer as formReducer } from 'redux-form'
import updateUserReducer from './reducers/updateUser'
import thunk from 'redux-thunk'

const client = axios.create({
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
})

export const store = createStore(
  reducer,
  {
    user: userModel,
    createTrip: createTripModel,
    spots: spotsModel,
    futureTrips: futureTripsModel,
  },
  composeEnhancer(applyMiddleware(...middlewares))
)
