import React, { Component } from 'react'

import Card from '@material-ui/core/Card'

import Chip from '@material-ui/core/Chip'
import CardHeader from '@material-ui/core/CardHeader'

import { withStyles } from '@material-ui/core/styles'

import './index.sass'
import { CardContent } from '@material-ui/core'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'

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
  avatar: {
    marginLeft: '3%',
  },
  marginCard: {
    marginBottom: '3%',
  },
  buttonContainer: {
    padding: '20px',
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

  render() {
    const {
      classes: { card, cardContent },
      trip,
    } = this.props
    const driver = {
      name: trip['driver']['driver_name'],
    }
    const steps = trip['trip_route_points']
    return (
      <Card className={card}>
        <Chip className={'primary'} size="small" label={status} />
        <CardHeader title={driver.name} />
        <CardContent className={cardContent}>
          <Stepper>
            {steps.map(point => {
              return (
                <Step key={point['name']}>
                  <StepLabel>{point['name']}</StepLabel>
                </Step>
              )
            })}
          </Stepper>
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(styles)(PassengerTripCard)
