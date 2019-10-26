import { actions as vehiclesActions } from '../actions/vehicles'

export default function vehiclesReducer(state = {}, action) {
  switch (action.type) {
    case vehiclesActions.VEHICLES_FETCH:
      return { ...state, loading: true }
    case vehiclesActions.VEHICLES_FETCH_SUCCESS:
      return { ...state, loading: false, vehicles: action.payload.data }
    case vehiclesActions.VEHICLES_FETCH_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching vehicles',
      }
    default:
      return state
  }
}
