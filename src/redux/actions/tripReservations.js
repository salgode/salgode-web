export const actions = {
  FETCH_TRIP_RESERVATIONS: 'TRIPS/FETCH',
  FETCH_TRIP_RESERVATIONS_SUCCESS: 'TRIPS/FETCH_SUCCESS',
  FETCH_TRIP_RESERVATIONS_FAIL: 'TRIP/FETCH_FAIL',
}

export function tripReservations(authToken, id) {
  return {
    type: actions.FETCH_TRIP_RESERVATIONS,
    payload: {
      request: {
        url: `driver/trips/${id}/reservations`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    },
  }
}
