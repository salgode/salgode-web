import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'
import { ParseDate, ParseHour } from '../../components/Parse/index'

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faUsers } from '@fortawesome/free-solid-svg-icons'
import { faCalendarAlt, faClock } from '@fortawesome/free-regular-svg-icons'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
// import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import './index.sass'

const styles = theme => ({
  card: {
    marginRight: '10%',
    marginLeft: '10%',
    marginTop: '20px',
    minWidth: 300,
    minHeight: 150,
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
  cardContent: {
    margin: '20px 10px 0px 20px',
    padding: '0px',
  },
  buttonContainer: {
    padding: '15px',
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
  seatsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  seats: {
    marginRight: '20px',
    marginTop: '5px',
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

class MyTripsCard extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { classes, trip } = this.props

    const date = ParseDate(trip.etd_info.etd)
    const time = ParseHour(trip.etd_info.etd)

    return (
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <div className={classes.marginCard}>
            <Typography variant="body1" component="p">
              <FontAwesomeIcon icon={faCircle} className="start-circle-icon" />
              {trip.trip_route.start.name}
            </Typography>
            <Typography variant="body1" component="p">
              <FontAwesomeIcon icon={faCircle} className="end-circle-icon" />
              {trip.trip_route.end.name}
            </Typography>
          </div>
          <div className={classes.seatsContainer}>
            <div className={classes.marginCard}>
              <Typography variant="body2" component="p">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="calendar-icon"
                />
                {date}
              </Typography>
              <Typography variant="body2" component="p">
                <FontAwesomeIcon icon={faClock} className="calendar-icon" />
                {time}
              </Typography>
            </div>
            <div className={classes.seats}>
              <Typography>
                {trip.available_seats}
                <FontAwesomeIcon icon={faUsers} />
              </Typography>
            </div>
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
        </CardActions>
      </Card>
    )
  }
}

MyTripsCard.propTypes = {
  classes: PropTypes.object.isRequired,
  trip: PropTypes.object.isRequired,
}

export default withStyles(styles)(MyTripsCard)
