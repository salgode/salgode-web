import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles, Fab } from '@material-ui/core'

const style = () => ({
  title: {
    padding: '0 0 24px 0',
    fontSize: 22,
    fontWeight: 600,
  },
  stepper: {
    display: 'flex',
    height: '10vh',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  line: {
    width: '60%',
    height: 5,
    backgroundColor: 'grey',
  },
})

class ProgressStepper extends Component {
  render() {
    const { pointName, starting, ending, classes } = this.props
    return (
      <>
        <div className={classes.stepper}>
          {starting ? (
            <Fab color="secondary"></Fab>
          ) : (
            <Fab color="default"></Fab>
          )}
          <div className={classes.line} />
          {ending ? <Fab color="primary"></Fab> : <Fab color="default"></Fab>}
        </div>
        <h1 className={classes.title}>{pointName}</h1>
      </>
    )
  }
}

ProgressStepper.propTypes = {
  classes: PropTypes.any,
  pointName: PropTypes.string.isRequired,
  starting: PropTypes.bool.isRequired,
  ending: PropTypes.bool.isRequired,
}

export default withStyles(style)(ProgressStepper)
