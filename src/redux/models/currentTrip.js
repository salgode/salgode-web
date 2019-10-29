export const currentTripModel = {
  trip: {
    trip_id: 'tri_12345',
    trip_status: 'open',
    driver_id: 'usr_12345',
    vehicle_id: 'veh_12345',
    etd: '2019-10-23T05:40:00.000Z',
    seats: 4,
    available_seats: 3,
    route: {
      start: 'pnt_1',
      end: 'pnt_4',
    },
    trip_route: {
      start: {
        id: 'pnt_1',
        name: 'Centro Artesanal Pueblito Los Dominicos',
      },
      end: {
        id: 'pnt_4',
        name: 'TOBALABA L1',
      },
    },
    route_points: ['pnt_1', 'pnt_2', 'pnt_3', 'pnt_4'],
    trip_route_points: [
      {
        id: 'pnt_1',
        name: 'Centro Artesanal Pueblito Los Dominicos',
      },
      {
        id: 'pnt_2',
        name: 'METRO MANQUEHUE',
      },
      {
        id: 'pnt_3',
        name: 'METRO ESCUELA MILITAR',
      },
      {
        id: 'pnt_4',
        name: 'TOBALABA L1',
      },
    ],
  },
  error: '',
  next_stop_idx: 0,
  arrived: false,
  loading: false,
}
