export const actions = {
  USER_LOGIN: 'USER/LOGIN',
  USER_LOGIN_FAIL: 'USER/LOGIN_FAIL',
  USER_LOGIN_SUCCESS: 'USER/LOGIN_SUCCESS',
  USER_SIGNUP: 'USER/SIGNUP',
  USER_SIGNUP_FAIL: 'USER/SIGNUP_FAIL',
  USER_SIGNUP_SUCCESS: 'USER/SIGNUP_SUCCESS',
  USER_LOGOUT: 'USER/LOGOUT',
  UPDATE_USER_DATA: 'UPDATE_USER_DATA',
}

export function loginUser(email, password) {
  return {
    type: actions.USER_LOGIN,
    payload: {
      request: {
        url: `/signin`,
        method: 'post',
        data: {
          email,
          password,
        },
        transformResponse: data => {
          return {
            token: data.bearer_token,
            email: data.email,
            name: data.first_name,
            lastName: data.last_name,
            phone: data.phone,
            userId: data.user_id,
            selfieLink: data.user_identifications.selfie,
            dniFrontLink: data.user_identifications.identification.front,
            dniBackLink: data.user_identifications.identification.back,
            driFrontLink: data.user_identifications.driver_license.front,
            driBackLink: data.user_identifications.driver_license.back,
            vehicles: data.vehicles,
          }
        },
      },
    },
  }
}

export function signupUser(
  name,
  lastName,
  email,
  phone,
  password,
  passwordRepeat,
  selfieLink,
  dniFrontLink,
  dniBackLink
) {
  const data = {
    email,
    last_name: lastName,
    first_name: name,
    phone,
    password,
    user_identifications: {
      selfie_image: selfieLink,
      identification_image_front: dniFrontLink,
      identification_image_back: dniBackLink,
    },
  }
  return {
    type: actions.USER_SIGNUP,
    payload: {
      request: {
        url: `/signup`,
        method: 'post',
        data: data,
      },
    },
  }
}

export function fetchUser(authToken) {
  return {
    type: actions.USER_LOGIN,
    payload: {
      request: {
        url: `/user`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        transformResponse: data => {
          return {
            name: data.first_name,
            lastName: data.last_name,
            phone: data.phone,
            selfieLink: data.user_identifications.selfie,
            dniFrontLink: data.user_identifications.identification.front,
            dniBackLink: data.user_identifications.identification.back,
            driFrontLink: data.user_identifications.driver_license.front,
            driBackLink: data.user_identifications.driver_license.back,
          }
        },
      },
    },
  }
}

export function logoutUser() {
  return {
    type: actions.USER_LOGOUT,
  }
}

export function updateUserData(data) {
  return {
    type: actions.UPDATE_USER_DATA,
    data,
  }
}
