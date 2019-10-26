export const actions = {
  RETRIEVE_ALL_SPOTS: 'RETRIEVE_ALL_SPOTS',
  RETRIEVE_ALL_SPOTS_SUCCESS: 'RETRIEVE_ALL_SPOTS_SUCCESS',
  RETRIEVE_ALL_SPOTS_FAIL: 'RETRIEVE_ALL_SPOTS_FAIL',
}

export function getAllSpots(authToken) {
  return {
    type: actions.RETRIEVE_ALL_SPOTS,
    payload: {
      request: {
        url: `/places`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    },
  }
}
