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
      selfie_image: imgs.selfieID,
      identification: { front: imgs.dniFrontID, back: imgs.dniBackID },
      driver_license: { front: imgs.driFrontID, back: imgs.driBackID },
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
