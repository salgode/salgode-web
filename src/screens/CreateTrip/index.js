import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Select from 'react-select'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

import { loginUser } from '../../redux/actions/user'
import { Grid, Button, Typography } from '@material-ui/core'
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import esLocale from 'date-fns/locale/es'

import {
  setStartStop,
  setEndStop,
  setStartTime,
  setVehicule,
  setSpaceInCar,
  clearStartStop,
  clearEndStop,
} from '../../redux/actions/createtrip'
import { fetchUserVehicles } from '../../redux/actions/vehicles'
import { getAllSpots } from '../../redux/actions/spots'
import { spotsFilter } from '../../utils/spotsFilter'

import routes from '../../routes'
import SimpleBreadcrumbs from '../../components/Breadcrumbs/index'

import './style.sass'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'

class CreateTripScreen extends Component {
  state = {
    isDateTimePickerVisible: false,
    pickedDate: null,
    reserved_seats: 1,
  }

  componentDidMount = () => {
    this.props.getAllSpots(this.props.user.token)
    this.props.fetchUserVehicles(this.props.user.token)
    this.props.setSpaceInCar(1)
  }

  handleDatePicked = date => {
    this.props.setStartTime(date)
    this.setState({ pickedDate: date })
  }

  handleChange = () => event => {
    if (event.target.value > 0) {
      this.props.setSpaceInCar(event.target.value)
      this.setState({ reserved_seats: event.target.value })
    }
  }

  renderCars() {
    const { vehicles } = this.props
    if (vehicles) {
      const filteredCars = vehicles.map(car => ({
        label: car.alias,
        value: car.vehicle_id,
      }))
      return (
        <Select
          className="search"
          isSearchable={true}
          options={filteredCars}
          onChange={option => this.props.setVehicule(option.value)}
          placeholder="Seleccionar..."
        />
      )
    }
  }

  checkIsDriver() {
    const { user } = this.props
    if (
      user.vehicles.length === 0 ||
      user.driFrontLink === null ||
      user.driBackLink === null
    ) {
      return true
    }
    return false
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
    const breadcrumb = {
      Conductor: '/',
      'Crear Viaje': '/',
    }

    if (this.checkIsDriver()) {
      alert(
        'Solo para conductores\nAsegurate de tener tu licencia de conducir y algún vehiculo registrado'
      )
      return <Redirect to={routes.profile} />
    }

    return (
      <div>
        <SimpleBreadcrumbs antecesors={breadcrumb} />
        <Paper style={{ marginTop: 20 }}>
          <Grid container justify="center" alignItems="center" spacing={2}>
            <Grid item xs={10} md={10} align="center" style={{ marginTop: 10 }}>
              <Typography>#SalgoDe:</Typography>
              <Select
                className="search"
                isSearchable={true}
                options={filteredSlots}
                onChange={option => this.props.setStartStop(option.value)}
                placeholder="Seleccionar..."
              />
            </Grid>
            <Grid item xs={10} md={10} align="center">
              <Typography>#LlegoHasta:</Typography>
              <Select
                className="search"
                isSearchable={true}
                options={filteredSlots}
                onChange={option => this.props.setEndStop(option.value)}
                placeholder="Seleccionar..."
              />
            </Grid>
            <Grid item xs={8} md={3} align="center">
              <Typography>#VoyEn:</Typography>
              {this.renderCars()}
            </Grid>

            <Grid item xs={12} md={12} align="center">
              <Typography align="center">Asientos a reservar</Typography>
              <TextField
                required
                variant="outlined"
                margin="normal"
                type="number"
                id="email"
                name="email"
                autoComplete="off"
                value={this.state.reserved_seats}
                onChange={this.handleChange('reserved_seats')}
              />
            </Grid>
            <Grid item xs={12} md={12} align="center">
              <Typography>Hora/Fecha de Salida:</Typography>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                <DateTimePicker
                  value={this.state.pickedDate}
                  onChange={this.handleDatePicked}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={12} md={3} align="center">
              <Button
                variant="contained"
                color="primary"
                component="span"
                disabled={disabled}
                className="submit"
              >
                <Link to={routes.addStops}>Siguiente</Link>
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }
}

CreateTripScreen.propTypes = {
  setStartTime: PropTypes.func.isRequired,
  setSpaceInCar: PropTypes.func.isRequired,
  setVehicule: PropTypes.func.isRequired,
  fetchUserVehicles: PropTypes.func.isRequired,
  spots: PropTypes.array.isRequired,
  vehicles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  startTime: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  endStop: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  startStop: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  clearEndStop: PropTypes.func.isRequired,
  clearStartStop: PropTypes.func.isRequired,
  getAllSpots: PropTypes.func.isRequired,
  setStartStop: PropTypes.func.isRequired,
  setEndStop: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

const mapStateToProps = ({ user, createTrip, spots, vehicles }) => {
  return {
    user: user,
    startStop: createTrip.startStop,
    endStop: createTrip.endStop,
    startTime: createTrip.startTime,
    setSpaceInCar: createTrip.setSpaceInCar,
    setVehicule: createTrip.setVehicule,
    spots: spots.spots,
    vehicles: vehicles.vehicles,
  }
}

const mapDispatchToProps = {
  loginUser,
  setStartStop,
  setEndStop,
  setStartTime,
  setVehicule,
  setSpaceInCar,
  clearStartStop,
  clearEndStop,
  getAllSpots,
  fetchUserVehicles,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTripScreen)
