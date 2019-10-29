export const actions = {
  FETCH_MANIFEST_DETAILS: 'TRIPS/FETCH',
  FETCH_MANIFEST_DETAILS_SUCCESS: 'TRIPS/FETCH_SUCCESS',
  FETCH_MANIFEST_DETAILS_FAIL: 'TRIP/FETCH_FAIL',
}

export function tripManifest(authToken, id) {
  return {
    type: actions.FETCH_MANIFEST_DETAILS,
    payload: {
      request: {
        url: `driver/trips/${id}/manifest`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    },
  }
}
