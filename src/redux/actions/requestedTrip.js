export const actions = {
  TRIPS_FETCH_REQUESTED: 'TRIPS/FETCH',
  TRIPS_FETCH_REQUESTED_SUCCESS: 'TRIPS/FETCH_SUCCESS',
  TRIPS_FETCH_REQUESTED_FAIL: 'TRIP/FETCH_FAIL',
  CANCEL_RESERVATION: 'TRIPS/FETCH',
  CANCEL_RESERVATION_SUCCESS: 'TRIPS/FETCH_SUCCESS',
  CANCEL_RESERVATION_FAIL: 'TRIP/FETCH_FAIL',
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

export function cancelPassengerReservation(authToken, id) {
  return {
    type: actions.CANCEL_RESERVATION,
    payload: {
      request: {
        url: `passenger/reservations/${id}/cancel`,
        method: 'post',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    },
  }
}
