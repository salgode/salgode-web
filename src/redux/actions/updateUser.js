import axios from 'axios'

export const actions = {
  STARTING_UPDATE_USER: 'STARTING_UPDATE_USER',
  SUCCESS_UPDATE_USER: 'SUCCESS_UPDATE_USER',
  LOADING_UPDATE_USER: 'LOADING_UPDATE_USER',
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

export const loadingUpdateUser = payload => {
  return {
    type: actions.LOADING_UPDATE_USER,
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
        first_name: name,
        last_name: lastName,
        email: email,
        phone: phone,
      }

      const res = await axios.put(
        `https://playground-api.salgode.com/user/${user_id}`,
        data,
        {
          headers: {
            Authorization: 'Bearer 12345',
          },
        }
      )

      if (res.status === 200 && res.statusText === 'OK') {
        dispatch(successUpdateUser())
      }
    } catch (error) {
      dispatch(loadingUpdateUser(error.response))
    }
  }
}
