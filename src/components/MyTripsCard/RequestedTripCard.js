import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Components
import { ParseDate, ParseHour } from '../index'
import './index.sass'
import { requestedTripsDetails } from '../../redux/actions/tripDetails'
import { cancelPassengerReservation } from '../../redux/actions/requestedTrip'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { faCalendarAlt, faClock } from '@fortawesome/free-regular-svg-icons'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Chip from '@material-ui/core/Chip'
import Collapse from '@material-ui/core/Collapse'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
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

class RequestedTrip extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      expanded: false,
      points: [],
    }
    this.detailTripSubmit = this.detailTripSubmit.bind(this)
    this.cancelReservationSubmit = this.cancelReservationSubmit.bind(this)
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
    if (status === 'cancelled') {
      return 'Cancelado'
    } else {
      return 'Pendiente'
    }
  }

  async detailTripSubmit() {
    this.setState({ loading: true })
    const { expanded } = this.state
    const { fetchdetailsTrip, trip } = this.props

    const reserve = await fetchdetailsTrip(this.props.user.token, trip.trip_id)

    if (reserve.error) {
      this.setState({ loading: false })
      return alert(
        'Error obteniendo el detalle',
        'Hubo un problema obteniendo el detalle del viaje. Por favor intentalo de nuevo.'
      )
    }
    const points = reserve.payload.data.trip_route_points
    this.setState({ expanded: !expanded, loading: false, points: points })
  }

  async cancelReservationSubmit() {
    this.setState({ loading: true })
    const { cancelTrip, trip } = this.props

    const reserve = await cancelTrip(this.props.user.token, trip.trip_id)
    if (reserve.error && !reserve.payload.data.success) {
      this.setState({ loading: false })
      return alert(
        'Error obteniendo el detalle',
        'Hubo un problema obteniendo el detalle del viaje. Por favor intentalo de nuevo.'
      )
    }
    this.setState({ loading: false })
  }

  renderSwitchStop(key, last) {
    switch (key) {
      case 0:
        return <FontAwesomeIcon icon={faCircle} className="start-circle-icon" />
      case last:
        return <FontAwesomeIcon icon={faCircle} className="end-circle-icon" />
      default:
        return (
          <FontAwesomeIcon
            icon={faCircleNotch}
            className="middle-circle-icon"
          />
        )
    }
  }

  renderCollapseDetail() {
    const { expanded, points } = this.state
    if (expanded) {
      return (
        <List dense={true}>
          {points.map((point, i, arr) => (
            <ListItem key={i}>
              <ListItemIcon>
                {this.renderSwitchStop(i, arr.length - 1)}
              </ListItemIcon>
              <ListItemText primary={point.name} />
            </ListItem>
          ))}
        </List>
      )
    } else {
      return <div></div>
    }
  }

  render() {
    const { expanded } = this.state
    const { classes, trip } = this.props
    const { reservation_status, driver, trip_route, etd_info } = trip
    const date = ParseDate(etd_info.etd)
    const time = ParseHour(etd_info.etd)
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
            <Avatar aria-label="recipe" className={classes.avatar}>
              B
            </Avatar>
          }
          title={driver.driver_name}
        />
        <CardContent className={classes.cardContent}>
          <div className={classes.marginCard}>
            <Typography variant="body1" component="p">
              <FontAwesomeIcon icon={faCircle} className="start-circle-icon" />
              {trip_route.start.name}
            </Typography>
            <Typography variant="body1" component="p">
              <FontAwesomeIcon icon={faCircle} className="end-circle-icon" />
              {trip_route.end.name}
            </Typography>
          </div>
          <div className={classes.marginCard}>
            <Typography variant="body2" component="p">
              <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
              {date}
            </Typography>
            <Typography variant="body2" component="p">
              <FontAwesomeIcon icon={faClock} className="calendar-icon" />
              {time}
            </Typography>
          </div>
        </CardContent>
        <CardActions className={classes.buttonContainer}>
          <Button
            variant="outlined"
            className={classes.buttonSuccess}
            color="primary"
            onClick={this.detailTripSubmit}
          >
            VER VIAJE
          </Button>
          {(reservation_status === 'accepted' ||
            reservation_status === 'pending') && (
            <Button
              variant="outlined"
              className={classes.buttonCancel}
              onClick={this.cancelReservationSubmit}
            >
              CANCELAR
            </Button>
          )}
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography>Paradas</Typography>
            {this.renderCollapseDetail()}
          </CardContent>
        </Collapse>
      </Card>
    )
  }
}

RequestedTrip.propTypes = {
  fetchdetailsTrip: PropTypes.func.isRequired,
  cancelTrip: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  trip: PropTypes.object.isRequired,
  tripDetails: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  user: PropTypes.object.isRequired,
}

const mapDispatchToProps = dispatch => ({
  fetchdetailsTrip: (token, id) => dispatch(requestedTripsDetails(token, id)),
  cancelTrip: (token, id) => dispatch(cancelPassengerReservation(token, id)),
})

const mapStateToProps = state => ({
  user: state.user,
  tripDetails: state.tripDetails,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(RequestedTrip))
