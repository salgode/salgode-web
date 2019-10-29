export const actions = {
  DECLINED_TRIP_RESERVATIONS: 'TRIPS/DECLINED_TRIP',
  DECLINED_TRIP_RESERVATIONS_SUCCESS: 'TRIPS/DECLINED_SUCCESS',
  DECLINED_TRIP_RESERVATIONS_FAIL: 'TRIP/DECLINED_FAIL',
}

export function declinedReservation(authToken, trip_id, reservation_id) {
  return {
    type: actions.DECLINED_TRIP_RESERVATIONS,
    payload: {
      request: {
        url: `driver/trips/${trip_id}/reservations/${reservation_id}/decline`,
        method: 'post',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    },
  }
}
