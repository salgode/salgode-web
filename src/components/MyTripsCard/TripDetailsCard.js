import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Collapse from '@material-ui/core/Collapse'
import { Grid } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { faCalendarAlt, faClock } from '@fortawesome/free-regular-svg-icons'

import { red } from '@material-ui/core/colors'

import { ParseDate, ParseHour } from '../../components/Parse/index'
import './index.sass'

const styles = theme => ({
  card: {
    marginRight: '10%',
    marginLeft: '10%',
    marginTop: '20px',
  },
  button: {
    top: '70%',
    float: 'right',
  },
  [theme.breakpoints.down('sm')]: {
    card: {
      marginRight: '3%',
      marginLeft: '3%',
    },
    button: {
      top: '0%',
      float: 'left',
    },
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  content: {
    // backgroundColor: 'red',
    paddingTop: '0px',
    paddingBottom: '0px',
  },
  departure: {
    color: 'lightblue',
    transform: 'scale(0.9)',
  },
  arrival: {
    color: 'green',
    transform: 'scale(0.9)',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  form: {
    flexGrow: 1,
  },
})

class TripDetailsCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      expanded: false,
    }
  }

  handleExpandClick = () => {
    const { expanded } = this.state
    this.setState({ expanded: !expanded })
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

  rederSelectOptions() {
    const { available_seats } = this.props.trip
    const items = []
    for (let step = 1; step <= available_seats; step++) {
      items.push(
        <option value={step} key={step}>
          {step}
        </option>
      )
    }
    return items
  }

  render() {
    const { trip_route, trip_route_points, driver, etd_info } = this.props.trip
    const { expanded } = this.state
    const { classes } = this.props

    const departurePoint = trip_route.start.name
    const arrivalPoint = trip_route.end.name

    const date = ParseDate(etd_info.etd)
    const time = ParseHour(etd_info.etd)

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {driver.driver_name[0]}
            </Avatar>
          }
          title={driver.driver_name}
        />
        <CardContent className={classes.content}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={7}>
              <List dense={true}>
                <ListItem>
                  <ListItemIcon>
                    <FontAwesomeIcon
                      icon={faCircle}
                      className="start-circle-icon"
                    />
                  </ListItemIcon>
                  <ListItemText primary={departurePoint} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <FontAwesomeIcon
                      icon={faCircle}
                      className="end-circle-icon"
                    />
                  </ListItemIcon>
                  <ListItemText primary={arrivalPoint} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      className="calendar-icon"
                    />
                  </ListItemIcon>
                  <ListItemText primary={date} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <FontAwesomeIcon icon={faClock} className="calendar-icon" />
                  </ListItemIcon>
                  <ListItemText primary={time} />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={5}>
              <Button
                variant="contained"
                className={classes.button}
                color="primary"
                onClick={this.handleExpandClick}
              >
                Ver Paradas
              </Button>
            </Grid>
          </Grid>
        </CardContent>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography>Paradas</Typography>
            <List dense={true}>
              {trip_route_points.map((point, i, arr) => (
                <ListItem key={i}>
                  <ListItemIcon>
                    {this.renderSwitchStop(i, arr.length - 1)}
                  </ListItemIcon>
                  <ListItemText primary={point.name} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Collapse>
      </Card>
    )
  }
}

TripDetailsCard.propTypes = {
  trip: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TripDetailsCard)
