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

// reducers
import { getAllSpots } from '../../redux/actions/spots'
import {
  addMiddleStop,
  removeMiddleStop,
  createTrip,
} from '../../redux/actions/createtrip'

class AddStopsScreen extends Component {
  propTypes = {
    spots: PropTypes.string.isRequired,
    endStop: PropTypes.string.isRequired,
    startStop: PropTypes.string.isRequired,
    middleStops: PropTypes.array.isRequired,
    startTime: PropTypes.array.isRequired,
    addMiddleStop: PropTypes.func.isRequired,
    removeMiddleStop: PropTypes.func.isRequired,
    createTrip: PropTypes.func.isRequired,
  }
  componentDidMount = () => {
    this.props.getAllSpots()
  }

  render() {
    const { startStop, endStop, spots, middleStops, startTime } = this.props
    const filteredSpots = spotsFilter(spots, [
      startStop,
      endStop,
      ...middleStops,
    ]).map(spot => ({
      label: `${spot.name}, ${spot.address}`,
      value: spot,
    }))
    const middleStopsComponents = middleStops.map((stop, i) => {
      return (
        <Grid item container key={i}>
          <Grid item xs={10}>
            <StopCard
              label="Parada"
              number={i + 1}
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
    })
    return (
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item container>
          <Grid item xs={12}>
            <StopCard label="Desde" stopName={startStop.name}></StopCard>
          </Grid>
        </Grid>
        <Grid item container>
          <Grid item xs={12}>
            <StopCard label="Hasta" stopName={endStop.name}></StopCard>
          </Grid>
        </Grid>

        {middleStopsComponents}
        <Typography>
          <p> Agrega paradas extra (opcional)</p>
        </Typography>
        <Select
          className="search"
          isSearchable={true}
          options={filteredSpots}
          onChange={option => this.props.addMiddleStop(option.value)}
        />
        <Button
          color="primary"
          onClick={() =>
            this.props.createTrip(
              [startStop, ...middleStops, endStop],
              startTime
            )
          }
        >
          Crear Viaje
        </Button>
      </Grid>
    )
  }
}

AddStopsScreen.navigationOptions = {
  header: null,
}

const mapStateToProps = ({ user, createTrip, spots }) => {
  return {
    user: user,
    startStop: createTrip.startStop,
    endStop: createTrip.endStop,
    middleStops: createTrip.middleStops,
    startTime: createTrip.startTime,
    spots: spots.spots,
  }
}

const mapDispatchToProps = {
  getAllSpots,
  addMiddleStop,
  removeMiddleStop,
  createTrip,
}

// TODO: CreateTripScreen.navigationOptions = {
//   title: 'Crear un viaje',
// }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStopsScreen)
