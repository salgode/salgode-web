export const actions = {
  ALL_TRIPS_FETCH_FUTURE_TRIPS: 'ALL_TRIPS/FETCH',
  ALL_TRIPS_FETCH_FUTURE_TRIPS_SUCCESS: 'ALL_TRIPS/FETCH_SUCCESS',
  ALL_TRIPS_FETCH_FUTURE_TRIPS_FAIL: 'ALL_TRIPS/FETCH_FAIL',
}

export function fetchAllFutureTrips(authToken) {
  console.log(`Bearer ${authToken}`)
  return {
    type: actions.ALL_TRIPS_FETCH_FUTURE_TRIPS,
    payload: {
      request: {
        url: `/trips/open`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    },
  }
}
