import React from 'react'
import PropTypes from 'prop-types'

import { Typography, Paper, Box } from '@material-ui/core'

function StopCard(props) {
  return (
    <Box mt={2}>
      <Paper className="stop-card">
        <Typography>
          <span className="stop-label">
            #{props.label} {props.number}
          </span>
          {props.stopName}
        </Typography>
      </Paper>
    </Box>
  )
}

StopCard.propTypes = {
  label: PropTypes.string.isRequired,
  number: PropTypes.number,
  stopName: PropTypes.string,
}

export default StopCard
