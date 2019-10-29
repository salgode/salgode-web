import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
  withStyles,
} from '@material-ui/core'

const style = () => ({
  subtitle: {
    padding: '12px 12px',
    fontSize: 20,
    fontWeight: 200,
  },
})
class WaitingPassengers extends Component {
  renderPassengers() {
    return this.props.passengers.map((passenger, index) => {
      return (
        <Card key={index}>
          <CardHeader
            avatar={<Avatar src={passenger.passenger_avatar} />}
            header="Usuario"
            title={passenger.passenger_name}
          />
          <CardContent>
            <Typography variant="body2" component="p">
              Telefono: {passenger.passenger_phone}
            </Typography>
          </CardContent>
        </Card>
      )
    })
  }
  render() {
    const { classes, label } = this.props
    return (
      <div>
        <h3 className={classes.subtitle}>{label}</h3>
        {this.renderPassengers()}
      </div>
    )
  }
}

WaitingPassengers.propTypes = {
  passengers: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
}

export default withStyles(style)(WaitingPassengers)
