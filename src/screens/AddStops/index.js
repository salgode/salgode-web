import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// ui components
import { Grid, Button, Typography } from '@material-ui/core'
import Select from 'react-select'
import StopCard from '../../components/StopCard'

// style
import './style.sass'

// reducers
import { getAllSpots } from '../../redux/actions/spots'
import { addMiddleStop } from '../../redux/actions/createtrip'

class AddStopsScreen extends Component {
  propTypes = {
    spots: PropTypes.string.isRequired,
    endStop: PropTypes.string.isRequired,
    startStop: PropTypes.string.isRequired,
    middleStops: PropTypes.array.isRequired,
    addMiddleStop: PropTypes.func.isRequired,
  }
  componentDidMount = () => {
    this.props.getAllSpots()
  }

  render() {
    const { startStop, endStop, spots, middleStops } = this.props
    const filteredSpots = spots.map(spot => ({ label: spot.name, value: spot }))
    const middleStopsComponents = middleStops.map((stop, i) => {
      return (
        <Grid item container key={i}>
          <Grid item xs={8}>
            <StopCard
              label="Parada"
              number={i + 1}
              stopName={stop.name}
            ></StopCard>
          </Grid>
          <Grid item xs={4}>
            <Typography>X</Typography>
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
        <Button>Avanzar</Button>
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
    spots: spots.spots,
  }
}

const mapDispatchToProps = {
  getAllSpots,
  addMiddleStop,
}

// TODO: CreateTripScreen.navigationOptions = {
//   title: 'Crear un viaje',
// }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStopsScreen)
