import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Loading from '../Loading/Loading'

// Components
import './index.sass'
import { acceptReservation } from '../../redux/actions/acceptReservation'
import { declinedReservation } from '../../redux/actions/declinedReservation'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faUsers } from '@fortawesome/free-solid-svg-icons'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  card: {
    marginRight: '10%',
    marginLeft: '10%',
    marginTop: '20px',
    minWidth: 300,
    minHeight: 250,
  },
  [theme.breakpoints.down('sm')]: {
    card: {
      marginRight: '3%',
      marginLeft: '3%',
      minWidth: 300,
      minHeight: 220,
    },
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  chip: {
    margin: '12px 12px 0px',
  },
  cardContent: {
    margin: '0px 0px 0px 39px',
    padding: '0px',
  },
  avatar: {
    marginLeft: '3%',
  },
  marginCard: {
    marginBottom: '3%',
  },
  buttonContainer: {
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
  buttonSuccess: {
    color: '#064acb',
    borderColor: '#064acb',
  },
  buttonCancel: {
    color: 'red',
    borderColor: 'red',
  },
  primary: {
    backgroundColor: 'green',
    color: 'white',
    margin: '12px 12px 0px',
  },
  secondary: {
    backgroundColor: '#ec9b3b',
    color: 'white',
    margin: '12px 12px 0px',
  },
  danger: {
    backgroundColor: 'red',
    color: 'white',
    margin: '12px 12px 0px',
  },
})

class TripReservationsCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
    this.acceptReservationSubmit = this.acceptReservationSubmit.bind(this)
    this.declinedReservationSubmit = this.declinedReservationSubmit.bind(this)
  }

  setColorChip = status => {
    const { classes } = this.props
    if (status === 'accepted') {
      return classes.primary
    }
    if (status === 'completed') {
      return classes.primary
    }
    if (status === 'declined' || status === 'cancelled') {
      return classes.danger
    } else {
      return classes.secondary
    }
  }

  setLabelChip = status => {
    if (status === 'accepted') return 'Aceptado'
    if (status === 'completed') return 'Completado'
    if (status === 'declined') return 'Rechazado'
    if (status === 'cancelled') return 'Cancelado'
    if (status === 'pending') return 'Pendiente'
  }

  async acceptReservationSubmit() {
    this.setState({ loading: true })
    const { acceptReservationSubmit, trip, trip_id } = this.props
    const reserve = await acceptReservationSubmit(
      this.props.user.token,
      trip_id,
      trip.reservation_id
    )

    if (reserve.error) {
      this.setState({ loading: false })
      return alert(
        'Error al aceptar el viaje\nHubo un problema aceptando el viaje. Por favor intentalo de nuevo.'
      )
    }
    this.setState({ loading: false })
    this.props.rePassengerReservations()
  }

  async declinedReservationSubmit() {
    this.setState({ loading: true })
    const { declinedReservationSubmit, trip, trip_id } = this.props
    const reserve = await declinedReservationSubmit(
      this.props.user.token,
      trip_id,
      trip.reservation_id
    )

    if (reserve.error) {
      this.setState({ loading: false })
      return alert(
        'Error obteniendo el detalle',
        'Hubo un problema obteniendo el detalle del viaje. Por favor intentalo de nuevo.'
      )
    }
    this.setState({ loading: false })
    this.props.reloadReservations()
  }

  get_passengers_by_stop() {
    const { reservation_route_places, reservation_route } = this.props.trip
    const point_to_idx = {}
    reservation_route_places.forEach(point => {
      point_to_idx[point.place_id] = point.place_name
    })
    const idx_up = point_to_idx[reservation_route.start]
    const idx_down = point_to_idx[reservation_route.end]
    return [idx_up, idx_down]
  }

  render() {
    if (this.state.loading) return <Loading />
    const { classes, trip } = this.props
    const { reservation_status, passenger, reserved_seats } = trip
    const [start, end] = this.get_passengers_by_stop()
    return (
      <Card className={classes.card}>
        <Chip
          className={this.setColorChip(reservation_status)}
          size="small"
          label={this.setLabelChip(reservation_status)}
        />
        <CardHeader
          className={classes.avatar}
          avatar={
            passenger.passenger_avatar ? (
              <Avatar src={passenger.passenger_avatar}></Avatar>
            ) : (
              <Avatar aria-label="recipe">{passenger.passenger_name[0]}</Avatar>
            )
          }
          title={passenger.passenger_name}
        />
        <CardContent className={classes.cardContent}>
          <div className={classes.marginCard}>
            <Typography variant="body1" component="p">
              <FontAwesomeIcon icon={faCircle} className="start-circle-icon" />
              {start}
            </Typography>
            <Typography variant="body1" component="p">
              <FontAwesomeIcon icon={faCircle} className="end-circle-icon" />
              {end}
            </Typography>
          </div>
          <div className={classes.marginCard}>
            <Typography variant="body2" component="p">
              <FontAwesomeIcon icon={faUsers} className="calendar-icon" />
              {reserved_seats}
            </Typography>
          </div>
        </CardContent>
        <CardActions className={classes.buttonContainer}>
          {reservation_status === 'pending' && (
            <Button
              variant="outlined"
              className={classes.buttonSuccess}
              color="primary"
              onClick={this.acceptReservationSubmit}
            >
              Aceptar
            </Button>
          )}
          {(reservation_status === 'accepted' ||
            reservation_status === 'pending') && (
            <Button
              variant="outlined"
              className={classes.buttonCancel}
              onClick={this.declinedReservationSubmit}
            >
              CANCELAR
            </Button>
          )}
        </CardActions>
      </Card>
    )
  }
}

TripReservationsCard.propTypes = {
  acceptReservationSubmit: PropTypes.func.isRequired,
  declinedReservationSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  trip: PropTypes.object.isRequired,
  trip_id: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  rePassengerReservations: PropTypes.func.isRequired,
  reloadReservations: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  acceptReservationSubmit: (token, trip_id, reservation_id) =>
    dispatch(acceptReservation(token, trip_id, reservation_id)),
  declinedReservationSubmit: (token, trip_id, reservation_id) =>
    dispatch(declinedReservation(token, trip_id, reservation_id)),
})

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TripReservationsCard))
