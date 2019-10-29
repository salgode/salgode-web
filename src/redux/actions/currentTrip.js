export const actions = {
  START_JOURNEY: 'START_JOURNEY',
  START_JOURNEY_SUCCESS: 'START_JOURNEY_SUCCESS',
  START_JOURNEY_FAIL: 'START_JOURNEY_FAIL',
  COMPLETE_JOURNEY: 'COMPLETE_JOURNEY',
  COMPLETE_JOURNEY_SUCCESS: 'COMPLETE_JOURNEY_SUCCESS',
  COMPLETE_JOURNEY_FAIL: 'COMPLETE_JOURNEY_FAIL',
  NEXT_STOP: 'NEXT_STOP',
  NEXT_STOP_SUCCESS: 'NEXT_STOP_SUCCESS',
  NEXT_STOP_FAIL: 'NEXT_STOP_FAIL',
  NEXT_STOP_ARRIVED: 'NEXT_STOP_ARRIVED',
  NEXT_STOP_ARRIVED_SUCCESS: 'NEXT_STOP_ARRIVED_SUCCESS',
  NEXT_STOP_ARRIVED_FAIL: 'NEXT_STOP_ARRIVED_FAIL',
  GET_MANIFEST: 'GET_MANIFEST',
  GET_MANIFEST_SUCCESS: 'GET_MANIFEST_SUCCESS',
  GET_MANIFEST_FAIL: 'GET_MANIFEST_FAIL',
}

export function startJourney(authToken, trip_id) {
  return {
    type: actions.START_JOURNEY,
    payload: {
      request: {
        url: `/driver/trips/${trip_id}/journey/start`,
        method: 'post',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    },
  }
}

export function completeJourney(authToken, trip_id) {
  return {
    type: actions.COMPLETE_JOURNEY,
    payload: {
      request: {
        url: `/driver/trips/${trip_id}/journey/complete`,
        method: 'post',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    },
  }
}

export function nextStop(authToken, trip_id) {
  return {
    type: actions.NEXT_STOP,
    payload: {
      request: {
        url: `/driver/trips/${trip_id}/journey/next`,
        method: 'post',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    },
  }
}

export function nextStopArrived(authToken, trip_id) {
  return {
    type: actions.NEXT_STOP_ARRIVED,
    payload: {
      request: {
        url: `/driver/trips/${trip_id}/journey/next/arrived`,
        method: 'post',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    },
  }
}

export function getManifest(authToken, trip_id) {
  return {
    type: actions.GET_MANIFEST,
    payload: {
      request: {
        url: `/driver/trips/${trip_id}/manifest`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    },
  }
}
