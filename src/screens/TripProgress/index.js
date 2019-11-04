import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import routes from '../../routes.js'

import { ProgressStepper, WaitingPassengers } from '../../components'
import Loading from '../../components/Loading/Loading'
import SimpleBreadcrumbs from '../../components/Breadcrumbs/index'

// ui components
import { Paper, Button, Typography, withStyles } from '@material-ui/core'

// action creators
import {
  startJourney,
  completeJourney,
  nextStop,
  getManifest,
} from '../../redux/actions/currentTrip'
import { requestedTripsDetails } from '../../redux/actions/tripDetails'

const style = () => ({
  buttonContainer: {
    textAlign: 'center',
    padding: 20,
  },
})

class CurrentTripScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      next_stop_idx: 0,
      trip: [],
      passengers_by_stop: [],
    }
    this.handleClickForward = this.handleClickForward.bind(this)
  }

  componentDidMount() {
    this.setState({ loading: true })
    this.getTripDetail()
    this.setState({ loading: false })
  }

  async getPassengers() {
    const { getManifest, match, user } = this.props
    const reserve = await getManifest(user.token, match.params.id)

    if (reserve.error) {
      return alert(
        'Error obteniendo el detalle',
        'Hubo un problema obteniendo el detalle del viaje. Por favor intentalo de nuevo.'
      )
    }
    const { trip } = this.state
    const passengers = this.get_passengers_by_stop(reserve.payload.data, trip)
    this.setState({ passengers_by_stop: passengers })
  }

  async getTripDetail() {
    const { requestedTripsDetails, match } = this.props

    const reserve = await requestedTripsDetails(
      this.props.user.token,
      match.params.id
    )

    if (reserve.error) {
      return alert(
        'Error obteniendo el detalle',
        'Hubo un problema obteniendo el detalle del viaje. Por favor intentalo de nuevo.'
      )
    }
    const next_stop = this.nextStopIfStarted(reserve.payload.data)
    this.setState({ trip: reserve.payload.data, next_stop_idx: next_stop })
    this.getPassengers()
  }

  nextStopIfStarted(trip) {
    let next_stop = this.state.next_stop_idx
    const trip_next_stop = trip.trip_next_point
    if (trip_next_stop !== null) {
      const point_to_idx = {}
      trip.trip_route_points.forEach((point, i) => {
        point_to_idx[point.place_id] = i
      })
      next_stop = point_to_idx[trip_next_stop.place_id]
    }
    return next_stop
  }

  get_passengers_by_stop(manifest, trip) {
    const idx_to_passengers = {}
    const point_to_idx = {}
    trip.trip_route_points.forEach((point, i) => {
      idx_to_passengers[i] = { up: [], down: [] }
      point_to_idx[point.place_id] = i
    })
    manifest.passengers.forEach(passenger => {
      const idx_up = point_to_idx[passenger.route.start]
      const idx_down = point_to_idx[passenger.route.end]
      idx_to_passengers[idx_up]['up'].push(passenger)
      idx_to_passengers[idx_down]['down'].push(passenger)
    })
    return idx_to_passengers
  }

  async handleClickForward() {
    const { user } = this.props
    const { trip, next_stop_idx } = this.state
    const { trip_id } = trip
    this.setState({ loading: true })
    if (next_stop_idx === 0) {
      await this.props.startJourney(user.token, trip_id)
      await this.props.nextStop(user.token, trip_id)
      this.setState({ next_stop_idx: next_stop_idx + 1, loading: false })
    } else if (next_stop_idx === trip.trip_route_points.length - 1) {
      await this.props.completeJourney(user.token, trip_id)
      await this.props.history.push(routes.myTrips)
    } else {
      await this.props.nextStop(user.token, trip_id)
      this.setState({ next_stop_idx: next_stop_idx + 1, loading: false })
    }
  }

  buttonMessage() {
    const { trip, next_stop_idx } = this.state
    if (next_stop_idx === 0) return 'Comenzar Viaje'
    if (next_stop_idx === trip.trip_route_points.length - 1)
      return 'Terminar Viaje'
    return 'Siguiente Parada'
  }

  render() {
    const { classes } = this.props
    const { trip, loading, passengers_by_stop, next_stop_idx } = this.state
    if (loading) return <Loading />

    if (trip && trip.length === 0) {
      return <div />
    }
    const passengers_up =
      !loading && passengers_by_stop.length > 0
        ? passengers_by_stop[next_stop_idx].up
        : []
    const passengers_down =
      !loading && passengers_by_stop.length > 0
        ? passengers_by_stop[next_stop_idx].down
        : []
    const breadcrumb = {
      Conductor: '/',
      'Mis Viajes': 'myTrips',
      Progreso: '/',
    }
    return (
      <div>
        <SimpleBreadcrumbs antecesors={breadcrumb} />
        <Paper>
          <ProgressStepper
            steps={trip.trip_route_points}
            activeStep={next_stop_idx}
          />
          {passengers_up.length ? (
            <WaitingPassengers label={'Recoge a:'} passengers={passengers_up} />
          ) : null}
          {passengers_down.length ? (
            <WaitingPassengers label={'Deja a:'} passengers={passengers_down} />
          ) : null}
          <div className={classes.buttonContainer}>
            <Button
              color="primary"
              variant="contained"
              onClick={this.handleClickForward}
            >
              <Typography variant="body1">{this.buttonMessage()}</Typography>
            </Button>
          </div>
        </Paper>
      </div>
    )
  }
}

CurrentTripScreen.propTypes = {
  requestedTripsDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  startJourney: PropTypes.func.isRequired,
  completeJourney: PropTypes.func.isRequired,
  nextStop: PropTypes.func.isRequired,
  arrived: PropTypes.bool.isRequired,
  getManifest: PropTypes.func.isRequired,
  passengers_by_stop: PropTypes.object,
  history: PropTypes.object.isRequired,
  user: PropTypes.shape({
    token: PropTypes.string,
  }).isRequired,
  match: PropTypes.object.isRequired,
}

const mapStateToProps = ({ user, currentTrip }) => {
  return {
    user: user,
    arrived: currentTrip.arrived,
  }
}

const mapDispatchToProps = {
  startJourney,
  completeJourney,
  nextStop,
  getManifest,
  requestedTripsDetails,
}

const styledComponent = withStyles(style)(CurrentTripScreen)
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(styledComponent)
