import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'
import { ParseDate, ParseHour } from '../../components/Parse/index'

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
    display: 'flex',
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
  }

  render() {
    const { classes, trip } = this.props

    const date = ParseDate(trip.trip_times.etd)
    const time = ParseHour(trip.trip_times.etd)

    return (
      <Card className={classes.card}>
        <CardContent className="card-content">
          <div className="stops">
            <Typography variant="body2" component="p">
              <FontAwesomeIcon icon={faCircle} className="start-circle-icon" />
              {trip.trip_route.start.name}
            </Typography>
            <Typography variant="body2" component="p">
              <FontAwesomeIcon icon={faCircle} className="end-circle-icon" />
              {trip.trip_route.end.name}
            </Typography>
          </div>
          <div className="date-time">
            <Typography variant="body1" component="p">
              <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
              {date}
            </Typography>
            <Typography variant="body1" component="p">
              <FontAwesomeIcon icon={faClock} className="calendar-icon" />
              {time}
            </Typography>
          </div>
          <Typography className="available-seats" color="textSecondary">
            {trip.available_seats}
            <FontAwesomeIcon icon={faUsers} className="relative" />
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
