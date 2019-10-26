import { actions } from '../actions/passengerTrips'
import initialState from '../models/passengerTrips'

export default function passengerTripsReducer(state = initialState, action) {
  const {
    GET_PASSENGER_TRIPS,
    GET_PASSENGER_TRIPS_SUCCESS,
    GET_PASSENGER_TRIPS_FAIL,
  } = actions
  const { type, payload } = action
  switch (type) {
    case GET_PASSENGER_TRIPS:
      return {
        ...state,
        loading: true,
      }
    case GET_PASSENGER_TRIPS_SUCCESS: {
      const { data } = payload
      return {
        ...state,
        loading: false,
        tripList: data,
      }
    }
    case GET_PASSENGER_TRIPS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error',
      }
    default:
      return state
  }
}
