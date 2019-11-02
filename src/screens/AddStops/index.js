import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// ui components
import { Grid, Button, Typography, Box, IconButton } from '@material-ui/core'
import Select from 'react-select'
import StopCard from '../../components/StopCard'
import ClearIcon from '@material-ui/icons/Clear'

// style
import './style.sass'

// utils
import { spotsFilter } from '../../utils/spotsFilter'
import { MAX_MIDDLE_STOPS } from '../../constants'
import routes from '../../routes'

// action creators
import { getAllSpots } from '../../redux/actions/spots'
import {
  addMiddleStop,
  removeMiddleStop,
  createTrip,
} from '../../redux/actions/createtrip'

class AddStopsScreen extends Component {
  constructor(props) {
    super(props)
    this.createMiddleStop = this.createMiddleStop.bind(this)
    this.submitTrip = this.submitTrip.bind(this)
  }

  componentDidMount = () => {
    if (!this.props.spots.length) {
      this.props.getAllSpots(this.props.user.token) // TODO unnecesary call if comming from createTrip screen
    }
  }

  createMiddleStop(stop, index) {
    return (
      <Grid key={index} item xs={12} container>
        <Grid item xs={10}>
          <StopCard
            label="Parada"
            number={index + 1}
            stopName={stop.name}
          ></StopCard>
        </Grid>
        <Grid item xs={2}>
          <Box mt={2} ml={1}>
            <IconButton onClick={() => this.props.removeMiddleStop(stop)}>
              <ClearIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    )
  }

  async submitTrip() {
    const {
      startStop,
      endStop,
      middleStops,
      startTime,
      history,
      spaceCar,
      carUsed,
    } = this.props
    const { payload } = await this.props.createTrip(
      this.props.user.token,
      [startStop, ...middleStops, endStop],
      startTime,
      spaceCar,
      carUsed
    )
    if (payload) {
      history.push(routes.myTrips)
    }
  }

  render() {
    const { startStop, endStop, spots, middleStops } = this.props
    const filteredSpots = spotsFilter(spots, [
      startStop,
      endStop,
      ...middleStops,
    ]).map(spot => ({
      label: `${spot.name}, ${spot.address}`,
      value: spot,
    }))
    const middleStopsComponents = middleStops.map(this.createMiddleStop)

    return (
      <Grid container justify="flex-start" alignItems="center">
        <Grid item xs={12}>
          <StopCard label="SalgoDe" stopName={startStop.name}></StopCard>
        </Grid>
        <Grid item xs={12}>
          <StopCard label="LlegoHasta" stopName={endStop.name}></StopCard>
        </Grid>
        {middleStopsComponents}
        <Grid item xs={10}>
          <Typography component="p">Agrega paradas extra (opcional)</Typography>
          <Select
            value={null}
            className="search"
            isSearchable={true}
            isDisabled={middleStops.length >= MAX_MIDDLE_STOPS}
            options={filteredSpots}
            onChange={option => this.props.addMiddleStop(option.value)}
          />
        </Grid>
        <Grid container item xs={10} justify="center">
          <Button color="primary" onClick={this.submitTrip}>
            Crear Viaje
          </Button>
        </Grid>
      </Grid>
    )
  }
}

AddStopsScreen.propTypes = {
  spots: PropTypes.array.isRequired,
  endStop: PropTypes.object.isRequired,
  spaceCar: PropTypes.object.isRequired,
  carUsed: PropTypes.object.isRequired,
  startStop: PropTypes.object.isRequired,
  middleStops: PropTypes.array.isRequired,
  startTime: PropTypes.instanceOf(Date).isRequired,
  addMiddleStop: PropTypes.func.isRequired,
  removeMiddleStop: PropTypes.func.isRequired,
  createTrip: PropTypes.func.isRequired,
  getAllSpots: PropTypes.func.isRequired,
  history: PropTypes.object,
  user: PropTypes.object,
}

const mapStateToProps = ({ user, createTrip, spots }) => {
  return {
    user: user,
    startStop: createTrip.startStop,
    endStop: createTrip.endStop,
    middleStops: createTrip.middleStops,
    startTime: createTrip.startTime,
    spots: spots.spots,
    spaceCar: createTrip.spaceCar,
    carUsed: createTrip.carUsed,
  }
}

const mapDispatchToProps = {
  getAllSpots,
  addMiddleStop,
  removeMiddleStop,
  createTrip,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStopsScreen)
