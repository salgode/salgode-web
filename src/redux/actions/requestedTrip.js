export const actions = {
  TRIPS_FETCH_REQUESTED: 'TRIPS/FETCH',
  TRIPS_FETCH_REQUESTED_SUCCESS: 'TRIPS/FETCH_SUCCESS',
  TRIPS_FETCH_REQUESTED_FAIL: 'TRIP/FETCH_FAIL',
}

export function fetchRequestedTrips(authToken) {
  return {
    type: actions.TRIPS_FETCH_REQUESTED,
    payload: {
      request: {
        url: `passenger/reservations`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    },
  }
}
