import { actions as tripActions } from '../actions/tripReservations'

export default function tripReservationsReducer(state = {}, action) {
  switch (action.type) {
    case tripActions.FETCH_TRIP_RESERVATIONS:
      return { ...state, loading: true }
    case tripActions.FETCH_TRIP_RESERVATIONS_SUCCESS:
      return { ...state, loading: false, trips: action.payload.data }
    case tripActions.FETCH_TRIP_RESERVATIONS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching trips reservations',
      }
    default:
      return state
  }
}
