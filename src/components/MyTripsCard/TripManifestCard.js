import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import { Grid } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { withStyles } from '@material-ui/core/styles'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

import './index.sass'

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
  cardContent: {
    margin: '0px 0px 0px 39px',
    padding: '0px',
  },
  button: {
    top: '70%',
    float: 'right',
  },
  [theme.breakpoints.down('sm')]: {
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
    marginLeft: '3%',
  },
  form: {
    flexGrow: 1,
  },
})

class TripManifestCard extends Component {
  constructor(props) {
    super(props)
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
    const {
      passenger_avatar,
      passenger_name,
      passenger_phone,
      trip_route,
    } = this.props.trip
    const { classes } = this.props

    const departurePoint = trip_route.start.name
    const arrivalPoint = trip_route.end.name

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={passenger_avatar}
            ></Avatar>
          }
          title={passenger_name}
        />
        <CardContent className={classes.cardContent}>
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
                      icon={faCircle}
                      className="end-circle-icon"
                    />
                  </ListItemIcon>
                  <ListItemText primary={passenger_phone} />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  }
}

TripManifestCard.propTypes = {
  trip: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TripManifestCard)
