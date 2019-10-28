import { actions as tripActions } from '../actions/tripReservations'

export default function declinedReservationsReducer(state = {}, action) {
  switch (action.type) {
    case tripActions.DECLINED_TRIP_RESERVATIONS:
      return { ...state, loading: true }
    case tripActions.DECLINED_TRIP_RESERVATIONS_SUCCESS:
      return { ...state, loading: false, trips: action.payload.data }
    case tripActions.DECLINED_TRIP_RESERVATIONS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching trips reservations',
      }
    default:
      return state
  }
}
