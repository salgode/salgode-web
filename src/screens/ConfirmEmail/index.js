import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Loading from '../../components/Loading/Loading'
import { Button, Container, Typography } from '@material-ui/core'
import DoneOutlineIcon from '@material-ui/icons/DoneOutline'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import { withStyles } from '@material-ui/core/styles'

import axios from 'axios'
import queryString from 'query-string'
import { BACKEND_CONFIRM_EMAIL } from '../../constants'

const SUCCESS_TITLE = '¡Correo confirmado!'
const SUCCESS_MSG =
  'Ahora podrás disfrutar de todas las funcionalidades de SalgoDe'
const ERROR_TITLE = 'Error de confirmación'
const ERROR_MSG =
  'Hubo un error al confirmar tu correo. Si el error persiste, contacta a hello@salgode.com.'

class ConfirmEmail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: false,
    }
  }

  componentDidMount() {
    const { user, token } = queryString.parse(this.props.location.search)
    axios
      .get(`${BACKEND_CONFIRM_EMAIL}?user=${user}&token=${token}`)
      .then(() => {
        this.setState({ loading: false })
      })
      .catch(() => {
        this.setState({ error: true, loading: false })
      })
  }

  render() {
    const { loading, error } = this.state
    const { classes } = this.props

    if (loading) {
      return <Loading />
    }
    if (error) {
      return (
        <Container className={classes.container}>
          <ErrorOutlineIcon className={[classes.icon, classes.error]} />
          <Container>
            <Typography align="center" className={classes.title}>
              {ERROR_TITLE}
            </Typography>
            <Typography align="center" className={classes.subtitle}>
              {ERROR_MSG}
            </Typography>
          </Container>
        </Container>
      )
    }
    return (
      <Container className={classes.container}>
        <DoneOutlineIcon color="primary" className={classes.icon} />
        <Container>
          <Typography align="center" className={classes.title}>
            {SUCCESS_TITLE}
          </Typography>
          <Typography align="center" className={classes.subtitle}>
            {SUCCESS_MSG}
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
