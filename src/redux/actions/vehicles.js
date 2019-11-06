export const actions = {
  VEHICLES_FETCH: 'VEHICLES/FETCH',
  VEHICLES_FETCH_SUCCESS: 'VEHICLES/FETCH_SUCCESS',
  VEHICLES_FETCH_FAIL: 'VEHICLES/FETCH_FAIL',
  UPDATE_VEHICLE: 'UPDATE_VEHICLE',
  UPDATE_VEHICLE_SUCCESS: 'UPDATE_VEHICLE_SUCCESS',
  UPDATE_VEHICLE_FAIL: 'UPDATE_VEHICLE_FAIL',
  CREATE_VEHICLE: 'CREATE_VEHICLE',
  CREATE_VEHICLE_SUCCESS: 'CREATE_VEHICLE_SUCCESS',
  CREATE_VEHICLE_FAIL: 'CREATE_VEHICLE_FAIL',
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

export function updateUserVehicle(authToken, vehicle_data) {
  return {
    type: actions.UPDATE_VEHICLE,
    payload: {
      request: {
        url: `user/vehicles/${vehicle_data.vehicle_id}`,
        method: 'put',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data: vehicle_data,
      },
    },
  }
}

export function createUserVehicle(authToken, vehicle_data) {
  return {
    type: actions.CREATE_VEHICLE,
    payload: {
      request: {
        url: `user/vehicles`,
        method: 'post',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data: vehicle_data,
      },
    },
  }
}
