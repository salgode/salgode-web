import { actions as tripActions } from '../actions/allTrips'

export default function allFutureTripsReducer(state = {}, action) {
  switch (action.type) {
    case tripActions.ALL_TRIPS_FETCH_FUTURE_TRIPS:
      return { ...state, loading: true }
    case tripActions.ALL_TRIPS_FETCH_FUTURE_TRIPS_SUCCESS:
      return { ...state, loading: false, trips: action.payload.data }
    case tripActions.ALL_TRIPS_FETCH_FUTURE_TRIPS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching trips',
      }
    default:
      return state
  }
}
