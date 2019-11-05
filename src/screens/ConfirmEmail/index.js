import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Loading from '../../components/Loading/Loading'
import { Button, Container, Typography } from '@material-ui/core'
import DoneOutlineIcon from '@material-ui/icons/DoneOutline'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import { withStyles } from '@material-ui/core/styles'
import './style.sass'

import { getObject, USER_DATA } from '../../utils/storeData'

import axios from 'axios'

const SUCCESS_TITLE = '¡Correo confirmado!'
const SUCCESS_MSG =
  'Ahora podrás disfrutar de todas las funcionalidades de SalgoDe'
const ERROR_TITLE = 'Error de confirmación'
const ERROR_MSG =
  'Hubo un error al confirmar tu correo. Si el error persiste, contacta a hello@salgode.com.'

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  button: {
    marginTop: '10vh',
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

class ConfirmEmail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: false,
    }
  }

  componentDidMount() {
    axios
      .get('http://www.mocky.io/v2/5dc0ed2b3300006f001a4d6f')
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
    const isLoggedIn = getObject(USER_DATA)

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
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
        >
          {isLoggedIn.token ? 'Buscar viajes' : 'Iniciar sesión'}
        </Button>
      </Container>
    )
  }
}

ConfirmEmail.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ConfirmEmail)
