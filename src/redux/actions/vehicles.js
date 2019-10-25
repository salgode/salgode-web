export const actions = {
  VEHICLES_FETCH: 'VEHICLES/FETCH',
  VEHICLES_FETCH_SUCCESS: 'VEHICLES/FETCH_SUCCESS',
  VEHICLES_FETCH_FAIL: 'VEHICLES/FETCH_FAIL',
}
export function fetchUserVehicles(authToken) {
  return {
    type: actions.VEHICLES_FETCH,
    payload: {
      request: {
        url: `user/vehicles`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    },
  }
}
