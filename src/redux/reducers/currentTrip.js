import { actions as currentTripActions } from '../actions/currentTrip'

export default function currentTripReducer(state = {}, action) {
  switch (action.type) {
    case currentTripActions.START_JOURNEY:
      return { ...state, loading: true }
    case currentTripActions.START_JOURNEY_SUCCESS:
      return { ...state, loading: false }
    case currentTripActions.START_JOURNEY_FAIL:
      return { ...state, loading: false, error: 'Error while starting journey' }
    case currentTripActions.COMPLETE_JOURNEY:
      return { ...state, loading: true }
    case currentTripActions.COMPLETE_JOURNEY_SUCCESS:
      return { ...state, loading: false }
    case currentTripActions.COMPLETE_JOURNEY_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while completing journey',
      }
    case currentTripActions.NEXT_STOP:
      return { ...state, loading: true }
    case currentTripActions.NEXT_STOP_SUCCESS:
      return {
        ...state,
        loading: false,
        arrived: false,
      }
    case currentTripActions.NEXT_STOP_FAIL:
      return { ...state, loading: false, error: 'Error on next stop' }
    case currentTripActions.NEXT_STOP_ARRIVED:
      return { ...state, loading: true }
    case currentTripActions.NEXT_STOP_ARRIVED_SUCCESS:
      return { ...state, loading: false, arrived: true }
    case currentTripActions.NEXT_STOP_ARRIVED_FAIL:
      return { ...state, loading: false, error: 'Error on next stop arrived' }
    case currentTripActions.GET_MANIFEST:
      return { ...state, loading: true }
    case currentTripActions.GET_MANIFEST_SUCCESS:
      return { ...state, loading: false }
    case currentTripActions.GET_MANIFEST_FAIL:
      return { ...state, loading: false, error: 'Error on getting manifest' }
    default:
      return state
  }
}
