import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Components
import { ParseDate, ParseHour } from '../index'
import './index.sass'
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

  handleExpandClick = () => {
    const { expanded } = this.state
    this.setState({ expanded: !expanded })
  }

  async cancelReservationSubmit() {
    this.setState({ loading: true })
    const { cancelTrip, trip } = this.props

    const reserve = await cancelTrip(this.props.user.token, trip.reservation_id)
    if (reserve.error && !reserve.payload.data.success) {
      this.setState({ loading: false })
      return alert(
        'Error obteniendo el detalle',
        'Hubo un problema obteniendo el detalle del viaje. Por favor intentalo de nuevo.'
      )
    }
    this.setState({ loading: false })
    this.props.reloadReservations()
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
    const { expanded } = this.state
    const { trip_route_points } = this.props.trip
    if (expanded) {
      return (
        <List dense={true}>
          {trip_route_points.map((point, i, arr) => (
            <ListItem key={i}>
              <ListItemIcon>
                {this.renderSwitchStop(i, arr.length - 1)}
              </ListItemIcon>
              <ListItemText primary={point.place_name} />
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
    const { reservation_status, driver, reservation_route, etd_info } = trip
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
          avatar={
            driver.driver_avatar ? (
              <Avatar src={driver.driver_avatar}></Avatar>
            ) : (
              <Avatar aria-label="recipe" className={classes.avatar}>
                {driver.driver_name[0]}
              </Avatar>
            )
          }
          title={driver.driver_name}
        />
        <CardContent className={classes.cardContent}>
          <div className={classes.marginCard}>
            <Typography variant="body1" component="p">
              <FontAwesomeIcon icon={faCircle} className="start-circle-icon" />
              {reservation_route.start.place_name}
            </Typography>
            <Typography variant="body1" component="p">
              <FontAwesomeIcon icon={faCircle} className="end-circle-icon" />
              {reservation_route.end.place_name}
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
            onClick={this.handleExpandClick}
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
  cancelTrip: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  trip: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  reloadReservations: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  cancelTrip: (token, id) => dispatch(cancelPassengerReservation(token, id)),
})

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(RequestedTrip))
