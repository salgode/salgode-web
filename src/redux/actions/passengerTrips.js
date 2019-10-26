// import { client as axiosClient } from '../store'
export const actions = {
  GET_PASSENGER_TRIPS: 'PASSENGER_TRIPS/FETCH',
  GET_PASSENGER_TRIPS_SUCCESS: 'PASSENGER_TRIPS/FETCH_SUCCESS',
  GET_PASSENGER_TRIPS_FAIL: 'PASSENGER_TRIPS/FETCH_FAIL',
}

// async function getPassengerTrips() {
//   const response = await axiosClient.get('/passenger/trips')
//   return response
// }
//
// export const getPassengerTripsAction = () => dispatch => {
//   const {
//     GET_PASSENGER_TRIPS,
//     GET_PASSENGER_TRIPS_SUCCESS,
//     GET_PASSENGER_TRIPS_FAIL,
//   } = actions
//   dispatch({ type: GET_PASSENGER_TRIPS })
//   getPassengerTrips()
//     .then(response => {
//       const { data } = response
//       dispatch({ type: GET_PASSENGER_TRIPS_SUCCESS, payload: { data } })
//     })
//     .catch(() => {
//       dispatch({
//         type: GET_PASSENGER_TRIPS_FAIL,
//         payload: { message: 'Error' },
//       })
//     })
// }

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
