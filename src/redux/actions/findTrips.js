export const actions = {
  ALL_TRIPS_FETCH_FUTURE_TRIPS: 'ALL_TRIPS/FETCH',
  ALL_TRIPS_FETCH_FUTURE_TRIPS_SUCCESS: 'ALL_TRIPS/FETCH_SUCCESS',
  ALL_TRIPS_FETCH_FUTURE_TRIPS_FAIL: 'ALL_TRIPS/FETCH_FAIL',
  RESERVE_TRIP: 'RESERVE_TRIP/FETCH',
  RESERVE_TRIP_SUCCESS: 'RESERVE_TRIP/FETCH_SUCCESS',
  RESERVE_TRIP_FAIL: 'RESERVE_TRIP/FETCH_FAIL',
  FIND_TRIPS_BY_PLACE: 'FIND_TRIPS_BY_PLACE',
  FIND_TRIPS_BY_PLACE_SUCCESS: 'FIND_TRIPS_BY_PLACE_SUCCESS',
  FIND_TRIPS_BY_PLACE_FAIL: 'FIND_TRIPS_BY_PLACE_FAIL',
}

export function fetchAllFutureTrips(authToken) {
  return {
    type: actions.ALL_TRIPS_FETCH_FUTURE_TRIPS,
    payload: {
      request: {
        url: `trips/open`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    },
  }
}

export function reserveTrip(authToken, trip_id, reserved_seats, start, end) {
  return {
    type: actions.RESERVE_TRIP,
    payload: {
      request: {
        url: `passenger/reservations`,
        method: 'post',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data: {
          trip_id,
          reserved_seats,
          route: {
            start,
            end,
          },
        },
      },
    },
  }
}

export function findTripsByPlace(authToken) {
  return {
    type: actions.FIND_TRIPS_BY_PLACE,
    payload: {
      request: {
        url: `trips/search/intersects/${authToken}`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    },
  }
}
