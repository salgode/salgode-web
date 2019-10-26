import { actions as tripActions } from '../actions/tripDetails'

export default function tripDetailsReducer(state = {}, action) {
  switch (action.type) {
    case tripActions.FETCH_REQUESTED_DETAILS:
      return { ...state, loading: true }
    case tripActions.FETCH_REQUESTED_DETAILS_SUCCESS:
      return { ...state, loading: false, trips: action.payload.data }
    case tripActions.FETCH_REQUESTED_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching trips details',
      }
    default:
      return state
  }
}
