import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'

export default class WaitingPassengers extends Component {
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
    return <div>{this.renderPassengers()}</div>
  }
}

WaitingPassengers.propTypes = {
  passengers: PropTypes.array,
}
