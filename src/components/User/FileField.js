import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'

function FileField(props) {
  return (
    <Grid item xs={4}>
      <div className="field">
        <label>{props.label}</label>
        <div className="control">
          <input ref={props.createdRef} type="file" />
        </div>
      </div>
    </Grid>
  )
}

FileField.propTypes = {
  createdRef: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
}

export default FileField
