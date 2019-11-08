import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternate'

const useStyles = makeStyles(() => ({
  card: {
    display: 'flex',
  },
}))

const UploadImage = React.forwardRef((props, ref) => {
  const [photoURL, setPhotoURL] = useState('')
  const classes = useStyles()

  const _onChange = id => event => {
    const reader = new FileReader()
    const file = event.target.files[0]

    reader.onloadend = () => {
      setPhotoURL(reader.result)
    }
    reader.readAsDataURL(file)

    props.onChange(id)
  }

  return (
    <Card className={classes.card} width="150px">
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {props.label}
          </Typography>
          <input
            accept="image/jpeg"
            className={classes.input}
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
            type="file"
            ref={ref}
            onChange={_onChange(props.id)}
          />
          <label htmlFor="raised-button-file">
            <Button
              variant="contained"
              color="default"
              component="span"
              className={classes.uploadButton}
            >
              Subir Foto
              <AddPhotoIcon className={classes.rightIcon} />
            </Button>
          </label>
        </CardContent>
      </div>
      <CardMedia image={photoURL} title={props.label} />
    </Card>
  )
})

UploadImage.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  ref: PropTypes.func,
}

UploadImage.displayName = 'UploadImage'

export default UploadImage
