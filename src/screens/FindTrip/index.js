import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Container } from '@material-ui/core'
import { CircularProgress } from '@material-ui/core'

import { FindTripsCard } from './../../components/MyTripsCard/index'
import './style.sass'

import { fetchAllFutureTrips, reserveTrip } from '../../redux/actions/allTrips'

class FindTripScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      trips: [],
    }
    this.getTrips = this.getTrips.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    this.getTrips()
  }

  async getTrips() {
    this.setState({ loading: true })
    const response = await this.props.fetchAllFutureTrips(12345) // this.props.user.token

    if (response.error) {
      this.setState({ loading: false })
      alert(
        'Error obteniendo viajes',
        'Hubo un problema obteniendo los viajes. Por favor intentalo de nuevo.'
      )
    }

    this.setState({ trips: this.props.allFutureTrips.trips, loading: false })
  }

  preFilterPayload(payload) {
    const newList = payload.trip_route_points.filter(function(value) {
      return value.name === payload.stop || value.name === payload.end
    })
    payload.stop = newList[0].id
    payload.end = newList[1].id
    delete payload.trip_route_points
    return payload
  }

  async onSubmit(payload) {
    this.setState({ loading: true })
    const { reserveTrip } = this.props

    const reserve = await reserveTrip(this.preFilterPayload(payload))

    if (reserve.error || !reserve.payload.data.success === 'true') {
      this.setState({ loading: false })
      return alert(
        'Error Reservando el viaje',
        'Hubo un problema reservando el viaje. Por favor intentalo de nuevo.'
      )
    }
    this.setState({ loading: false })
  }

  render() {
    const { trips, loading } = this.state
    return (
      <div className="find-trip">
        <Container>
          {loading ? (
            <CircularProgress />
          ) : (
            trips.map((trip, i) => (
              <FindTripsCard trip={trip} key={i} onSubmit={this.onSubmit} />
            ))
          )}
        </Container>
      </div>
    )
  }
}

FindTripScreen.propTypes = {
  fetchAllFutureTrips: PropTypes.func.isRequired,
  allFutureTrips: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  reserveTrip: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  fetchAllFutureTrips: token => dispatch(fetchAllFutureTrips(token)),
  reserveTrip: payload =>
    dispatch(
      reserveTrip(
        payload.trip_id,
        payload.reserved_seats,
        payload.start,
        payload.end
      )
    ),
})

const mapStateToProps = state => ({
  user: state.user,
  allFutureTrips: state.allFutureTrips,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FindTripScreen)
