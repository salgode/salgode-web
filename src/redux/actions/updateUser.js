import { client as axiosClient } from '../store'
import { getObject, USER_DATA } from '../../utils/storeData'

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

export const updateUserThunk = selfieLink => {
  return async (dispatch, getState) => {
    dispatch(startingUpdateUser())
    try {
      const { name, email, lastName, phone } = getState().form.updateUser.values
      const { userId, token } = getObject(USER_DATA)

      const data = {
        user_id: userId,
        first_name: name,
        last_name: lastName,
        email: email,
        phone: phone,
      }

      if (selfieLink) {
        data.selfieLink = selfieLink
      }
      console.log(selfieLink)
      const res = await axiosClient.put(`/user`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      // borrar
      console.log(res)
      if (res.status === 200 && res.data.success) {
        dispatch(successUpdateUser())
      }
    } catch (error) {
      dispatch(errorUpdateUser(error.response))
    }
  }
}
