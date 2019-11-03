import React from 'react'
import PropTypes from 'prop-types'
import { Grid, TextField, MenuItem } from '@material-ui/core'

function FormField(props) {
  return (
    <Grid item xs={12}>
      <TextField
        autoFocus={props.focus}
        variant="outlined"
        required
        fullWidth
        label={props.label}
        value={props.value}
        onChange={props.onChange}
        select={props.select}
        type={props.type}
      >
        {props.select
          ? props.options.map((option, i) => (
              <MenuItem key={i} value={option}>
                {option}
              </MenuItem>
            ))
          : null}
      </TextField>
    </Grid>
  )
}

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
  select: PropTypes.bool,
  focus: PropTypes.bool,
  type: PropTypes.string,
}

export default FormField
