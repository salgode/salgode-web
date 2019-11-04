import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'

class ProgressStepper extends Component {
  render() {
    const { steps, activeStep } = this.props

    return (
      <>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((passenger, i) => {
            return (
              <Step key={i}>
                <StepLabel>{passenger.place_name}</StepLabel>
              </Step>
            )
          })}
        </Stepper>
      </>
    )
  }
}

ProgressStepper.propTypes = {
  steps: PropTypes.array.isRequired,
  activeStep: PropTypes.number.isRequired,
}

export default ProgressStepper
