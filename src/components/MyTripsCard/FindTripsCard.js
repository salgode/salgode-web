import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Collapse from '@material-ui/core/Collapse'
import { Grid } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { faCalendarAlt, faClock } from '@fortawesome/free-regular-svg-icons'

import MoreVertIcon from '@material-ui/icons/MoreVert'
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
})

class FindTripsCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      expanded: false,
      anchorEl: null,
      stop: '',
    }
  }

  handleExpandClick = () => {
    const { expanded } = this.state
    this.setState({ expanded: !expanded })
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = stop => {
    if (typeof stop === 'object') {
      this.setState({ anchorEl: null, stop: '' })
      return
    }
    this.setState({ anchorEl: null, stop })
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

  renderSelectStop(trip_route_points) {
    const menuItems = []

    trip_route_points.map((point, i, arr) => {
      if (i !== arr.length - 1) {
        menuItems.push(
          <MenuItem onClick={() => this.handleClose(point.name)} key={i}>
            {point.name}
          </MenuItem>
        )
      }
    })
    return menuItems
  }

  render() {
    const {
      trip_route,
      trip_route_points,
      driver,
      trip_times,
    } = this.props.trip
    const { expanded } = this.state
    const { classes } = this.props

    const departurePoint = trip_route.start.name
    const arrivalPoint = trip_route.end.name

    const date = ParseDate(trip_times.etd)
    const time = ParseHour(trip_times.etd)

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {driver.driver_name[0]}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
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
                Solicitar viaje
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
            <Menu
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose}
            >
              {this.renderSelectStop(trip_route_points)}
            </Menu>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Seleccionar parada"
                autoFocus
                value={this.state.stop}
                onClick={this.handleClick}
                aria-controls="simple-menu"
                aria-haspopup="true"
              />
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Confirmar solicitud
              </Button>
            </form>
          </CardContent>
        </Collapse>
      </Card>
    )
  }
}

FindTripsCard.propTypes = {
  trip: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(FindTripsCard)
