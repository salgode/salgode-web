import { actions as userActions } from '../actions/user'

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case userActions.USER_LOGIN:
      return { ...state, loading: true }
    case userActions.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.payload.data,
      }
    case userActions.USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while login user',
      }
    case userActions.USER_SIGNUP:
      return { ...state, loading: true }
    case userActions.USER_SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.payload.data,
        token: action.payload.data.bearer_token,
      }
    case userActions.USER_SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while signup user',
      }
    case userActions.USER_LOGOUT:
      return {}
    case userActions.UPDATE_USER_DATA:
      return {
        ...state,
        ...action.data,
      }
    default:
      return state
  }
}
