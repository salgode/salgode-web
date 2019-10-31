import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { ParseDate, ParseHour } from '../../components/Parse/index'
import './index.sass'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Chip from '@material-ui/core/Chip'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { faCalendarAlt, faClock } from '@fortawesome/free-regular-svg-icons'

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
  marginCard: {
    marginBottom: '3%',
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

class PassengerTripCard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  setColorChip = status => {
    const { classes } = this.props
    if (status === 'open') return classes.primary
    if (status === 'completed') return classes.primary
    if (status === 'in_progress') return classes.secondary
    if (status === 'cancelled') return classes.danger
  }

  setLabelChip = status => {
    if (status === 'open') return 'Abierto'
    if (status === 'completed') return 'Completado'
    if (status === 'in_progress') return 'En proceso'
    if (status === 'cancelled') return 'Cancelado'
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

  render() {
    const { classes, trip } = this.props
    const { trip_status, driver, trip_route_points, etd_info } = trip
    const date = ParseDate(etd_info.etd)
    const time = ParseHour(etd_info.etd)
    return (
      <Card className={classes.card}>
        <Chip
          className={this.setColorChip(trip_status)}
          size="small"
          label={this.setLabelChip(trip_status)}
        />
        <CardHeader title={driver.name} />
        <CardContent className={classes.cardContent}>
          <List dense={true}>
            {trip_route_points.map((point, i, arr) => {
              return (
                <ListItem key={i}>
                  <ListItemIcon>
                    {this.renderSwitchStop(i, arr.length - 1)}
                  </ListItemIcon>
                  <ListItemText primary={point.place_name} />
                </ListItem>
              )
            })}
          </List>
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
      </Card>
    )
  }
}

PassengerTripCard.propTypes = {
  classes: PropTypes.object.isRequired,
  trip: PropTypes.object.isRequired,
}

export default withStyles(styles)(PassengerTripCard)
