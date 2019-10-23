import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'

// Components
// import Button from '@material-ui/core/Button'
// import Container from '@material-ui/core/Container'
// import CssBaseline from '@material-ui/core/CssBaseline'
// import TextField from '@material-ui/core/TextField'
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
