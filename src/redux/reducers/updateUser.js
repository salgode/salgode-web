import { actions as updateUserActions } from '../actions/updateUser'

const INITIAL_STATE = {
  loading: false,
  success: false,
  error: null,
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case updateUserActions.STARTING_UPDATE_USER:
      return Object.assign({}, state, {
        loading: true,
        success: false,
        error: null,
      })
    case updateUserActions.SUCCESS_UPDATE_USER:
      return Object.assign({}, state, {
        loading: false,
        success: true,
        error: null,
      })
    case updateUserActions.ERROR_UPDATE_USER:
      return Object.assign({}, state, {
        loading: false,
        success: false,
        error: action.payload,
      })
    default:
      return state
  }
}

export default reducer
