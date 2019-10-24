import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'

// Components
// import Button from '@material-ui/core/Button'
// import Container from '@material-ui/core/Container'
// import CssBaseline from '@material-ui/core/CssBaseline'
// import TextField from '@material-ui/core/TextField'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

import { faCalendarAlt, faClock } from '@fortawesome/free-regular-svg-icons'

import Card from '@material-ui/core/Card'
// import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { ParseDate } from '../index'

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
})

class RequestedTrip extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { classes, trip } = this.props
    return (
      <Card className={classes.card}>
        <Chip className={classes.chip} size="small" label={trip.status} />
        <CardHeader
          className={classes.avatar}
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              B
            </Avatar>
          }
          title={trip.user.name}
        />
        <CardContent className={classes.cardContent}>
          <div className={classes.marginCard}>
            <Typography variant="body1" component="p">
              <FontAwesomeIcon icon={faCircle} className="start-circle-icon" />
              {trip.start}
            </Typography>
            <Typography variant="body2" component="p">
              <FontAwesomeIcon icon={faCircle} className="end-circle-icon" />
              {trip.end}
            </Typography>
          </div>
          <div className={classes.marginCard}>
            <Typography variant="body2" component="p">
              <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
              <ParseDate props={trip.timestamp} />
            </Typography>
            <Typography variant="body2" component="p">
              <FontAwesomeIcon icon={faClock} className="calendar-icon" />
              {trip.timestamp}
            </Typography>
          </div>
          <Typography variant="body2" component="p">
            <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
            <ParseDate props={trip.timestamp} />
          </Typography>
          <Typography variant="body2" component="p">
            <FontAwesomeIcon icon={faClock} className="calendar-icon" />
            {trip.timestamp}
          </Typography>
        </CardContent>
      </Card>
    )
  }
}

// RequestedTrip.propTypes = {
// }

export default withStyles(styles)(RequestedTrip)
