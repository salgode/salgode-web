import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'

const FileField = React.forwardRef((props, ref) => {
  return (
    <Grid item xs={4}>
      <div className="field">
        <label>{props.label}</label>
        <div className="control">
          <input ref={ref} type="file" />
        </div>
      </div>
    </Grid>
  )
})

FileField.displayName = 'FileField'

FileField.propTypes = {
  label: PropTypes.string.isRequired,
}

export default FileField
