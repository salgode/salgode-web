import { applyMiddleware, combineReducers, createStore } from 'redux'
import axiosMiddleware from 'redux-axios-middleware'
import axios from 'axios'
import userReducer from './reducers/user'
import futureTripReducer from './reducers/trips'
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

const reducer = combineReducers({
  user: userReducer,
  futureTrips: futureTripReducer,
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
  applyMiddleware(...middlewares)
)
