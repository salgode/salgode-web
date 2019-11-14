import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Button, Container, Typography } from '@material-ui/core'
import BuildOutlineIcon from '@material-ui/icons/BuildOutlined'
import { withStyles } from '@material-ui/core/styles'

import { LANDING_PAGE_DOWNLOAD } from '../../constants'

const TITLE = 'Sitio en construcción'
const SUBTITLE = 'Por el momento utiliza nuestras aplicaciones móviles'
const MESSAGE =
  'En 5 segundos te redireccionaremos a una página para descargarlas'

class ConfirmEmail extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    setTimeout(this.redirect, 5000)
  }

  redirect = () => {
    window.location.href = LANDING_PAGE_DOWNLOAD
    return null
  }

  render() {
    const { classes } = this.props

    return (
      <Container className={classes.container}>
        <BuildOutlineIcon color="primary" className={classes.icon} />
        <Container>
          <Typography align="center" className={classes.title}>
            {TITLE}
          </Typography>
          <Typography align="center" className={classes.subtitle}>
            {SUBTITLE}
          </Typography>
          <Typography
            align="center"
            variant="caption"
            className={classes.message}
          >
            {MESSAGE}
          </Typography>
        </Container>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.firstButton}
          onClick={() => {
            window.location.replace(
              'https://apps.apple.com/us/app/salgode-comparte-tu-viaje/id1487651479?ls=1'
            )
          }}
        >
          App iOS
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          onClick={() => {
            window.location.replace(
              'https://play.google.com/store/apps/details?id=cl.salgode.salgode'
            )
          }}
        >
          App Android
        </Button>
      </Container>
    )
  }
}

ConfirmEmail.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object,
}

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  button: {
    marginTop: '1vh',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20vh',
  },
  error: {
    color: '#d50000',
  },
  firstButton: {
    marginTop: '10vh',
  },
  icon: {
    fontSize: 100,
  },
  message: {
    display: 'block',
    marginTop: 8,
  },
  title: {
    fontWeight: 500,
    fontSize: 28,
    marginTop: 16,
    marginBottom: 16,
  },
  subtitle: {
    fontWeight: 100,
  },
})

export default withStyles(styles)(ConfirmEmail)
