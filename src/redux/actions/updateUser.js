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

export const updateUserThunk = allImages => {
  return async (dispatch, getState) => {
    dispatch(startingUpdateUser())
    try {
      const { name, lastName, phone } = getState().form.updateUser.values
      const {
        userId,
        token,
        dniFrontLink,
        dniBackLink,
        selfieLink,
      } = getObject(USER_DATA)

      const data = {
        user_id: userId,
        first_name: name,
        last_name: lastName,
        phone: phone,
        user_identifications: {
          selfie: selfieLink,
          identifications: {
            front: dniFrontLink,
            back: dniBackLink,
          },
        },
      }

      const { avatar, dniFront, dniBack } = allImages

      if (avatar) {
        data.user_identifications.selfie = avatar
      }

      if (dniFront) {
        data.user_identifications.identifications.front = dniFront
      }

      if (dniBack) {
        data.user_identifications.identifications.back = dniBack
      }

      const res = await axiosClient.put(`/user`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.status === 200 && res.data.success) {
        dispatch(successUpdateUser())
      }
    } catch (error) {
      dispatch(errorUpdateUser(error.response))
    }
  }
}
