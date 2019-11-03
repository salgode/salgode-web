export const actions = {
  UPDATE_USER: 'UPDATE_USER',
  UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
  UPDATE_USER_FAIL: 'UPDATE_USER_FAIL',
}

export function updateUser(authToken, { lastName, name, phone, imgs }) {
  const data = {
    last_name: lastName,
    first_name: name,
    phone: phone,
    user_identifications: {
      selfie_image: imgs.selfieLink,
      identification: { front: imgs.dniFrontLink, back: imgs.dniBackLink },
      driver_license: { front: imgs.driFrontLink, back: imgs.driBackLink },
    },
  }
  return {
    type: actions.UPDATE_USER,
    payload: {
      request: {
        url: `/user`,
        method: 'put',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data,
      },
    },
  }
}
