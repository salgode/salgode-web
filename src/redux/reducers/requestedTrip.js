import { actions as tripActions } from '../actions/requestedTrip'

export default function requestedTripsReducer(state = {}, action) {
  switch (action.type) {
    case tripActions.TRIPS_FETCH_REQUESTED:
      return { ...state, loading: true }
    case tripActions.TRIPS_FETCH_REQUESTED_SUCCESS:
      return { ...state, loading: false, trips: action.payload.data }
    case tripActions.TRIPS_FETCH_REQUESTED_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching trips',
      }
    default:
      return state
  }
}
