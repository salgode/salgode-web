import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'
import { ParseDate, ParseHour } from '../../components/ParseDate/index'

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faUsers } from '@fortawesome/free-solid-svg-icons'
import { faCalendarAlt, faClock } from '@fortawesome/free-regular-svg-icons'

import Card from '@material-ui/core/Card'
// import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import './index.sass'

const styles = theme => ({
  card: {
    marginRight: '10%',
    marginLeft: '10%',
    marginTop: '20px',
    minWidth: 300,
    minHeight: 220,
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
})

class MyTripsCard extends Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)

    this.getValidity = this.getValidity.bind(this)
  }

  onChangeEmail({ target: { value: email } }) {
    const validity = email.match(
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )

    this.setState(oldState => ({
      email,
      validity: { ...oldState.validity, email: !!validity },
    }))
  }

  onChangePassword({ target: { value: password } }) {
    this.setState({ password })
  }

  getValidity() {
    return this.state.validity.email
  }

  render() {
    const { classes } = this.props
    const { trip } = this.props

    const date = ParseDate(trip.trip_times.etd)
    const hour = ParseHour(trip.trip_times.etd)

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="body2" component="p">
            <FontAwesomeIcon icon={faCircle} className="start-circle-icon" />
            {trip.trip_route.start.name}
          </Typography>
          <Typography className="relative" color="textSecondary">
            {trip.available_seats}
            <FontAwesomeIcon icon={faUsers} className="relative" />
          </Typography>
          <Typography variant="body2" component="p">
            <FontAwesomeIcon icon={faCircle} className="end-circle-icon" />
            {trip.trip_route.end.name}
          </Typography>
          <Typography variant="body2" component="p">
            <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
            {date}
          </Typography>
          <Typography variant="body2" component="p">
            <FontAwesomeIcon icon={faClock} className="calendar-icon" />
            {hour}
          </Typography>
        </CardContent>
      </Card>
    )
  }
}

MyTripsCard.propTypes = {
  classes: PropTypes.object.isRequired,
  trip: PropTypes.object.isRequired,
}

export default withStyles(styles)(MyTripsCard)
