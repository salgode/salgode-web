export const actions = {
  FETCH_REQUESTED_DETAILS: 'TRIPS/FETCH',
  FETCH_REQUESTED_DETAILS_SUCCESS: 'TRIPS/FETCH_SUCCESS',
  FETCH_REQUESTED_DETAILS_FAIL: 'TRIP/FETCH_FAIL',
}

export function requestedTripsDetails(authToken, id) {
  return {
    type: actions.FETCH_REQUESTED_DETAILS,
    payload: {
      request: {
        url: `driver/trips/${id}`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    },
  }
}
