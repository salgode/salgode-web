export const actions = {
  USER_LOGIN: 'USER/LOGIN',
  USER_LOGIN_FAIL: 'USER/LOGIN_FAIL',
  USER_LOGIN_SUCCESS: 'USER/LOGIN_SUCCESS',
  USER_SIGNUP: 'USER/SIGNUP',
  USER_SIGNUP_FAIL: 'USER/SIGNUP_FAIL',
  USER_SIGNUP_SUCCESS: 'USER/SIGNUP_SUCCESS',
  USER_LOGOUT: 'USER/LOGOUT',
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
  selfieLink = 'placeholder',
  driverLicenseLink = 'placeholder',
  dniFrontLink = 'placeholder',
  dniBackLink = 'placeholder'
  // carPlate,
  // carColor,
  // carBrand,
  // carModel
) {
  const data = {
    email,
    last_name: lastName,
    first_name: name,
    phone,
    password,
    // password_repeat: passwordRepeat,
    user_identifications: {
      selfie_image: selfieLink,
      identification_image_front: dniFrontLink,
      identification_image_back: dniBackLink,
      driver_license: driverLicenseLink,
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

export function fetchUser(authToken, id) {
  return {
    type: actions.USER_LOGIN,
    payload: {
      request: {
        url: `/users/${id}`,
        method: 'get',
        headers: {
          Authorization: authToken,
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
