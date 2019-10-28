export const actions = {
  ACCEPT_TRIP_RESERVATIONS: 'TRIPS/ACCEPT',
  ACCEPT_TRIP_RESERVATIONS_SUCCESS: 'TRIPS/ACCEPT_SUCCESS',
  ACCEPT_TRIP_RESERVATIONS_FAIL: 'TRIP/ACCEPT_FAIL',
}

export function acceptReservation(authToken, trip_id, reservation_id) {
  return {
    type: actions.ACCEPT_TRIP_RESERVATIONS,
    payload: {
      request: {
        url: `driver/trips/${trip_id}/reservations/${reservation_id}/accept`,
        method: 'post',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    },
  }
}
