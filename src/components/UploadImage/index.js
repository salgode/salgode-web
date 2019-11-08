import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const NO_PHOTO_IMAGE = '/images/camera_alt_grey_192x192.png'

const useStyles = makeStyles(theme => ({
  card: {
    width: '100%',
  },
  cardActionArea: {
    display: 'flex',
    flexGrow: '1 0',
    width: '100%',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  photo: {
    minWidth: 150,
    width: 150,
    height: 150,
    flexGrow: 0,
  },
  title: {
    lineHeight: 1.2,
  },
}))

const UploadImage = React.forwardRef((props, ref) => {
  const [photoURL, setPhotoURL] = useState(NO_PHOTO_IMAGE)
  const classes = useStyles()

  const _onChange = event => {
    const reader = new FileReader()
    const file = event.target.files[0]

    reader.onloadend = () => {
      setPhotoURL(reader.result)
    }
    reader.readAsDataURL(file)

    props.onChange()
  }

  return (
    <Card className={classes.card} width="150px">
      <input
        accept="image/jpeg"
        className={classes.input}
        style={{ display: 'none' }}
        id={props.id}
        multiple
        type="file"
        ref={ref}
        onChange={_onChange}
      />
      <label htmlFor={props.id}>
        <CardActionArea component="span" className={classes.cardActionArea}>
          <CardContent className={classes.content}>
            <Typography variant="h6" className={classes.title}>
              {props.title}
            </Typography>
            <Typography variant="body2">{props.subtitle}</Typography>
          </CardContent>
          <CardMedia
            image={photoURL}
            title={props.title}
            className={classes.photo}
          />
        </CardActionArea>
      </label>
    </Card>
  )
})

UploadImage.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  ref: PropTypes.func,
}

UploadImage.displayName = 'UploadImage'

export default UploadImage
