import { client as axiosClient } from '../store'
export const actions = {
  STARTING_UPDATE_USER: 'STARTING_UPDATE_USER',
  SUCCESS_UPDATE_USER: 'SUCCESS_UPDATE_USER',
  ERROR_UPDATE_USER: 'ERROR_UPDATE_USER',
}

export const startingUpdateUser = () => {
  return {
    type: actions.STARTING_UPDATE_USER,
  }
}

export const successUpdateUser = () => {
  return {
    type: actions.SUCCESS_UPDATE_USER,
  }
}

export const errorUpdateUser = payload => {
  return {
    type: actions.ERROR_UPDATE_USER,
    payload,
  }
}

export const updateUserThunk = user_id => {
  return async (dispatch, getState) => {
    dispatch(startingUpdateUser())
    try {
      const {
        name,
        email,
        lastName,
        phone,
        //plate,
        //color,
        //brand,
        //model,
      } = getState().form.updateUser.values

      const data = {
        user_id: user_id,
        first_name: name,
        last_name: lastName,
        email: email,
        phone: phone,
      }

      const res = await axiosClient.put(`/user`, data)
      if (res.status === 200 && res.data.success) {
        dispatch(successUpdateUser())
      }
    } catch (error) {
      dispatch(errorUpdateUser(error.response))
    }
  }
}
