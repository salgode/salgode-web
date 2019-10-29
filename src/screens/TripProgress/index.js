import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import routes from '../../routes.js'

// ui components
import { ProgressStepper, WaitingPassengers } from '../../components'
import { Paper, Button, Typography, withStyles } from '@material-ui/core'

// action creators
import {
  startJourney,
  completeJourney,
  nextStop,
  nextStopArrived,
  getManifest,
} from '../../redux/actions/currentTrip'

const style = () => ({
  buttonContainer: {
    textAlign: 'center',
    padding: 20,
  },
})

class CurrentTripScreen extends Component {
  constructor(props) {
    super(props)
    this.handleClickForward = this.handleClickForward.bind(this)
  }

  componentDidMount() {
    const { trip } = this.props
    this.props.getManifest(trip.trip_id)
  }

  handleClickForward() {
    const { trip, next_stop_idx, arrived } = this.props
    const { trip_id } = trip
    if (next_stop_idx === 0) {
      this.props.startJourney()
      this.props.nextStop(trip_id)
    } else if (next_stop_idx === trip.route_points.length - 1) {
      this.props.completeJourney(trip_id)
      this.props.history.push(routes.myTrips)
    } else if (arrived) {
      this.props.nextStop(trip_id)
    } else {
      this.props.nextStopArrived(trip_id)
    }
  }

  buttonMessage() {
    const { trip, next_stop_idx, arrived } = this.props
    if (next_stop_idx === 0) return 'Comenzar Viaje'
    if (next_stop_idx === trip.route_points.length - 1) return 'Terminar Viaje'
    if (arrived) return 'Siguiente Parada'
    return 'Arrivo a Parada'
  }

  render() {
    const {
      classes,
      trip,
      next_stop_idx,
      arrived,
      passengers_by_stop,
    } = this.props
    const passengers_up = passengers_by_stop
      ? passengers_by_stop[next_stop_idx].up
      : []
    const passengers_down = passengers_by_stop
      ? passengers_by_stop[next_stop_idx].down
      : []
    const end = next_stop_idx === trip.route_points.length - 1
    return (
      <div>
        <ProgressStepper
          pointName={trip.trip_route_points[next_stop_idx].name}
          starting={next_stop_idx === 0 && !arrived}
          ending={end}
        />
        <Paper>
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
  classes: PropTypes.object.isRequired,
  trip: PropTypes.object.isRequired,
  startJourney: PropTypes.func.isRequired,
  completeJourney: PropTypes.func.isRequired,
  nextStop: PropTypes.func.isRequired,
  nextStopArrived: PropTypes.func.isRequired,
  next_stop_idx: PropTypes.number.isRequired,
  arrived: PropTypes.bool.isRequired,
  getManifest: PropTypes.func.isRequired,
  passengers_by_stop: PropTypes.object,
  history: PropTypes.object.isRequired,
}

const mapStateToProps = ({ currentTrip }) => {
  return {
    trip: currentTrip.trip,
    arrived: currentTrip.arrived,
    next_stop_idx: currentTrip.next_stop_idx,
    passengers_by_stop: currentTrip.passengers_by_stop,
  }
}

const mapDispatchToProps = {
  startJourney,
  completeJourney,
  nextStop,
  nextStopArrived,
  getManifest,
}

const styledComponent = withStyles(style)(CurrentTripScreen)
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(styledComponent)
