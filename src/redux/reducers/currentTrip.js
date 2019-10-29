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
        next_stop_idx: state.next_stop_idx + 1,
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
      return {
        ...state,
        loading: false,
        passengers_by_stop: get_passengers_by_stop(
          action.payload.data,
          state.trip
        ),
      }
    case currentTripActions.GET_MANIFEST_FAIL:
      return { ...state, loading: false, error: 'Error on getting manifest' }
    default:
      return state
  }
}

function get_passengers_by_stop(manifest, trip) {
  const idx_to_passengers = {}
  const point_to_idx = {}
  trip.route_points.forEach((point, i) => {
    idx_to_passengers[i] = { up: [], down: [] }
    point_to_idx[point] = i
  })
  manifest.passengers.forEach(passenger => {
    const idx_up = point_to_idx[passenger.route.start]
    const idx_down = point_to_idx[passenger.route.end]
    idx_to_passengers[idx_up]['up'].push(passenger)
    idx_to_passengers[idx_down]['down'].push(passenger)
  })
  return idx_to_passengers
}
