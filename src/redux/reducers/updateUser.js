import { actions as updateUserActions } from '../actions/updateUser'

export default function updateUserReducer(state = {}, action) {
  switch (action.type) {
    case updateUserActions.UPDATE_USER:
      return { ...state, loading: true }
    case updateUserActions.UPDATE_USER_SUCCESS:
      return { ...state, loading: false }
    case updateUserActions.UPDATE_USER_FAIL:
      return { ...state, loading: false }
    default:
      return state
  }
}
