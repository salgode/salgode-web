import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Container } from '@material-ui/core'
import Loading from '../../components/Loading/Loading'
import Select, { components } from 'react-select'
import { withStyles } from '@material-ui/core/styles'
import { FindTripsCard } from './../../components/MyTripsCard/index'

import './style.sass'

// action creators
import {
  fetchAllFutureTrips,
  reserveTrip,
  findTripsByPlace,
} from '../../redux/actions/findTrips'
import { getAllSpots } from '../../redux/actions/spots'

const styles = () => ({
  select: {
    marginTop: '20px',
  },
})

class FindTripScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      trips: [],
    }
    this.getTrips = this.getTrips.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.getSpots = this.getSpots.bind(this)
  }

  componentDidMount() {
    this.getSpots()
    this.getTrips()
  }

  async getSpots() {
    this.setState({ loading: true })
    const response = await this.props.getAllSpots(this.props.user.token)
    if (response.error) {
      alert('Error obteniendo paradas')
    }
  }

  async getTrips(spot) {
    this.setState({ loading: true })
    const { token } = this.props.user
    let response
    if (spot) {
      response = await this.props.findTripsByPlace(token, spot.place_id)
    } else {
      response = await this.props.fetchAllFutureTrips(token)
    }
    if (response.error) {
      this.setState({ loading: false })
      alert(
        'Error obteniendo viajes',
        'Hubo un problema obteniendo los viajes. Por favor intentalo de nuevo.'
      )
    }

    this.setState({ loading: false })
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

    const reserve = await reserveTrip(
      this.props.user.token,
      this.preFilterPayload(payload)
    )

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
    const { loading } = this.state
    const { classes, trips } = this.props
    const spots = this.props.spots.map(spot => ({
      label: `${spot.name}, ${spot.address}`,
      value: spot,
    }))

    const Placeholder = props => <components.Placeholder {...props} />

    return (
      <div className="find-trip">
        <Container>
          <Select
            components={{ Placeholder }}
            placeholder={'#Desde'}
            className={classes.select}
            isSearchable={true}
            options={spots}
            onChange={option => this.getTrips(option.value)}
            styles={{
              placeholder: base => ({
                ...base,
                fontSize: '1em',
                color: 'black',
                fontWeight: 800,
              }),
            }}
          />
          {loading ? (
            <Loading />
          ) : (
            <div>
              {trips.map((trip, i) => (
                <FindTripsCard trip={trip} key={i} onSubmit={this.onSubmit} />
              ))}
            </div>
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
  user: PropTypes.object.isRequired,
  spots: PropTypes.array.isRequired,
  getAllSpots: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  trips: PropTypes.array.isRequired,
  findTripsByPlace: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  fetchAllFutureTrips: token => dispatch(fetchAllFutureTrips(token)),
  reserveTrip: (token, payload) =>
    dispatch(
      reserveTrip(
        token,
        payload.trip_id,
        payload.reserved_seats,
        payload.start,
        payload.end
      )
    ),
  getAllSpots: token => dispatch(getAllSpots(token)),
  findTripsByPlace: token => dispatch(findTripsByPlace(token)),
})

const mapStateToProps = state => ({
  user: state.user,
  spots: state.spots.spots,
  trips: state.findTrips.trips,
})

const styledComponent = withStyles(styles)(FindTripScreen)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(styledComponent)
