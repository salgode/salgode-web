import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../../redux/actions/user'
import { Grid, Button, Typography } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import PropTypes from 'prop-types'
import {
  setStartStop,
  setEndStop,
  setStartTime,
  clearStartStop,
  clearEndStop,
} from '../../redux/actions/createtrip'
import { getAllSpots } from '../../redux/actions/spots'
import { spotsFilter } from '../../utils/spotsFilter'
import Select from 'react-select'
import { Link } from 'react-router-dom'

import routes from '../../routes'

import './style.sass'

class CreateTripScreen extends Component {
  state = {
    isDateTimePickerVisible: false,
    pickedDate: null,
  }

  propTypes = {
    setStartTime: PropTypes.string.isRequired,
    spots: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    endStop: PropTypes.string.isRequired,
    startStop: PropTypes.string.isRequired,
    clearEndStop: PropTypes.func.isRequired,
    clearStartStop: PropTypes.func.isRequired,
    getAllSpots: PropTypes.func.isRequired,
    setStartStop: PropTypes.func.isRequired,
    setEndStop: PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    this.props.getAllSpots()
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true })
  }

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false })
  }

  handleDatePicked = date => {
    this.props.setStartTime(date)
    this.setState({ pickedDate: date })
    this.hideDateTimePicker()
  }

  render() {
    const { startStop, endStop, startTime, spots } = this.props
    const disabled = startStop && endStop && startTime ? false : true
    const filteredSlots = spotsFilter(spots, [startStop, endStop]).map(
      spot => ({
        label: `${spot.name}, ${spot.address}`,
        value: spot,
      })
    )

    return (
      <Grid container direction="column" justify="center" alignItems="center">
        <Typography>Desde:</Typography>
        <Select
          className="search"
          isSearchable={true}
          options={filteredSlots}
          onChange={option => this.props.setStartStop(option.value)}
        />

        <Typography>Hasta:</Typography>
        <Select
          className="search"
          isSearchable={true}
          options={filteredSlots}
          onChange={option => this.props.setEndStop(option.value)}
        />

        <Typography>Hora/Fecha de Salida:</Typography>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            value={this.pickedDate}
            onChange={this.handleDatePicked}
          />
        </MuiPickersUtilsProvider>

        <Button block disabled={disabled}>
          <Link to={routes.addStops}>Siguiente</Link>
        </Button>
      </Grid>
    )
  }
}

CreateTripScreen.navigationOptions = {
  header: null,
}

const mapStateToProps = ({ user, createTrip, spots }) => {
  return {
    user: user,
    startStop: createTrip.startStop,
    endStop: createTrip.endStop,
    startTime: createTrip.startTime,
    spots: spots.spots,
  }
}

const mapDispatchToProps = {
  loginUser,
  setStartStop,
  setEndStop,
  setStartTime,
  clearStartStop,
  clearEndStop,
  getAllSpots,
}

// TODO: CreateTripScreen.navigationOptions = {
//   title: 'Crear un viaje',
// }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTripScreen)
