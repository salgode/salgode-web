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
    case tripActions.CANCEL_RESERVATION:
      return { ...state, loading: true }
    case tripActions.CANCEL_RESERVATION_SUCCESS:
      return { ...state, loading: false, trips: action.payload.data }
    case tripActions.CANCEL_RESERVATION_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while cancel reservation',
      }
    default:
      return state
  }
}
