export const actions = {
  SET_START_STOP: 'SET_START_STOP',
  SET_VEHICULE: 'SET_VEHICULE',
  SET_END_STOP: 'SET_END_STOP',
  SET_START_TIME: 'SET_START_TIME',
  SET_SPACE_CAR: 'SET_SPACE_CAR',
  CLEAR_CREATE_TRIP_INFO: 'CLEAR_CREATE_TRIP_INFO',
  CLEAR_START_STOP: 'CLEAR_START_STOP',
  CLEAR_END_STOP: 'CLEAR_END_STOP',
  CREATE_TRIP: 'CREATE_TRIP',
  CREATE_TRIP_SUCCESS: 'CREATE_TRIP_SUCCESS',
  CREATE_TRIP_FAIL: 'CREATE_TRIP_FAIL',
  ADD_MIDDLE_STOP: 'ADD_MIDDLE_STOP',
  REMOVE_MIDDLE_STOP: 'REMOVE_MIDDLE_STOP',
}

export function setStartStop(startStop) {
  return {
    type: actions.SET_START_STOP,
    payload: startStop,
  }
}

export function setEndStop(endStop) {
  return {
    type: actions.SET_END_STOP,
    payload: endStop,
  }
}

export function addMiddleStop(stop) {
  return {
    type: actions.ADD_MIDDLE_STOP,
    payload: stop,
  }
}

export function removeMiddleStop(stop) {
  return {
    type: actions.REMOVE_MIDDLE_STOP,
    payload: stop,
  }
}

export function clearStartStop() {
  return {
    type: actions.CLEAR_START_STOP,
  }
}

export function clearEndStop() {
  return {
    type: actions.CLEAR_END_STOP,
  }
}

export function setStartTime(time) {
  return {
    type: actions.SET_START_TIME,
    payload: time,
  }
}

export function setVehicule(vehicule) {
  return {
    type: actions.SET_VEHICULE,
    payload: vehicule,
  }
}

export function setSpaceInCar(space) {
  return {
    type: actions.SET_SPACE_CAR,
    payload: space,
  }
}

export function clearCreateTripInfo() {
  return { type: actions.CLEAR_CREATE_TRIP_INFO }
}

export function createTrip(authToken, route_points, etd, spaceCar, carID) {
  // missing car_i and driver_id. Checkoput backend repo to work with
  const route_points_ids = route_points.map(spot => {
    return spot.id
  })
  return {
    type: actions.CREATE_TRIP,
    payload: {
      request: {
        url: `/driver/trips`,
        method: 'post',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data: {
          vehicle_id: carID,
          route_points: route_points_ids,
          available_seats: parseInt(spaceCar),
          etd_info: {
            etd: etd,
            etd_policy: 'strict',
            max_wait: 5,
          },
        },
      },
    },
  }
}
