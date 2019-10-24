import React from 'react'
// import PropTypes from 'prop-types'

import './style.sass'
import { Container } from '@material-ui/core'

import FindTripsCard from './../../components/FindTripsCard/index'

import { fetchAllFutureTrips } from '../../redux/actions/allTrips'

// Store
import { connect } from 'react-redux'

// Components
// import { CircularProgress } from '@material-ui/core'

// const MESSAGE =
// 'Hubo un problema iniciandso sesión. Por favor intentalo de nuevo.'

const trips = [
  {
    trip_id: 'tri_12345',
    trip_status: 'open',
    driver: {
      driver_id: 'usr_12345',
      driver_name: 'Nicolas',
      driver_phone: '+56 9 9999 9999',
    },
    vehicle_id: 'veh_12345',
    trip_times: {
      etd: '2019-10-23T05:40:00.000Z',
      etd_policy: 'strict',
      max_wait: 5,
    },
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
]

class FindTripScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      trips: [],
    }
    this.getTrips = this.getTrips.bind(this)
  }

  componentDidMount() {
    this.getTrips()
  }

  async getTrips() {
    this.setState({ loading: true })
    // console.log(this.props)
    const response = await this.props.fetchAllFutureTrips(12345) // this.props.user.token

    console.log(response)

    // if (response.error) {
    //   this.setState({ loading: false })
    //   alert(
    //     'Error obteniendo viajes',
    //     'Hubo un problema obteniendo los viajes. Por favor intentalo de nuevo.'
    //   )
    // }

    // this.setState({ trips: this.props.futureTrips.trips, loading: false })
  }

  render() {
    return (
      <div className="find-trip">
        <Container>
          {trips.map((trip, i) => (
            <FindTripsCard trip={trip} key={i} />
          ))}
        </Container>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAllFutureTrips: token => dispatch(fetchAllFutureTrips(token)),
})

const mapStateToProps = state => ({
  user: state.user,
  futureTrips: state.futureTrips,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FindTripScreen)
