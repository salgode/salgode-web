import { actions as tripActions } from '../actions/findTrips'

export default function findTripsReducer(state = {}, action) {
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
    case tripActions.RESERVE_TRIP:
      return { ...state, loading: true }
    case tripActions.RESERVE_TRIP_SUCCESS:
      return { ...state, loading: false, trip: action.payload.data }
    case tripActions.RESERVE_TRIP_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error reservando el viaje',
      }
    case tripActions.FIND_TRIPS_BY_PLACE:
      return { ...state, loading: true }
    case tripActions.FIND_TRIPS_BY_PLACE_SUCCESS:
      return { ...state, loading: false, trips: action.payload.data }
    case tripActions.FIND_TRIPS_BY_PLACE_FAIL:
      return { ...state, loading: false, error: 'Error while fetching trips' }
    default:
      return state
  }
}
