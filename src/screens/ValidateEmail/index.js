import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Loading from '../../components/Loading/Loading'
import { Container, Typography } from '@material-ui/core'
import DoneOutlineIcon from '@material-ui/icons/DoneOutline'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import { withStyles } from '@material-ui/core/styles'
import './style.sass'

import axios from 'axios'

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '25vh',
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

class ValidateEmail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: false,
    }
  }

  componentDidMount() {
    axios
      .get('http://www.mocky.io/v2/5dc0ed2b3300006f001a4d6f1')
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
              Error de confirmación
            </Typography>
            <Typography align="center" className={classes.subtitle}>
              Hubo un error al confirmar tu correo. Si el error persiste,
              contacta a hello@salgode.com
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
            ¡Correo confirmado!
          </Typography>
          <Typography align="center" className={classes.subtitle}>
            Ahora podrás disfrutar de todas las funcionalidades de SalgoDe
          </Typography>
        </Container>
      </Container>
    )
  }
}

ValidateEmail.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ValidateEmail)
