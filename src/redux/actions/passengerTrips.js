// import { client as axiosClient } from '../store'
export const actions = {
  GET_PASSENGER_TRIPS: 'PASSENGER_TRIPS/FETCH',
  GET_PASSENGER_TRIPS_SUCCESS: 'PASSENGER_TRIPS/FETCH_SUCCESS',
  GET_PASSENGER_TRIPS_FAIL: 'PASSENGER_TRIPS/FETCH_FAIL',
}

export function getPassengerTripsAction(authToken) {
  return {
    type: actions.GET_PASSENGER_TRIPS,
    payload: {
      request: {
        url: `passenger/trips`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    },
  }
}
