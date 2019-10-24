import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faUsers } from '@fortawesome/free-solid-svg-icons'

import { faCalendarAlt, faClock } from '@fortawesome/free-regular-svg-icons'

import Card from '@material-ui/core/Card'
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
  }

  render() {
    const { classes, trip } = this.props

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="body1" component="p">
            <FontAwesomeIcon icon={faCircle} className="start-circle-icon" />
            {trip.start}
          </Typography>
          <Typography className="relative" color="textSecondary">
            {trip.spacesUsed}
            <FontAwesomeIcon icon={faUsers} className="relative" />
          </Typography>
          <Typography variant="body2" component="p">
            <FontAwesomeIcon icon={faCircle} className="end-circle-icon" />
            {trip.end}
          </Typography>
          <Typography variant="body2" component="p">
            <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
            {trip.timestamp}
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

MyTripsCard.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MyTripsCard)
