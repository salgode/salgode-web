import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// Components
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import './index.sass'
import routes from '../../../routes.js'

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '50%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  [theme.breakpoints.down('sm')]: {
    form: {
      width: '80%',
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: '10px',
  },
  [theme.breakpoints.up('sm')]: {
    alignRight: {
      'text-align': 'right',
    },
  },
})

class SignInForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',

      validity: { email: false },
    }

    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)

    this.getValidity = this.getValidity.bind(this)
  }

  onChangeEmail({ target: { value: email } }) {
    const validity = email.match(
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )

    this.setState(oldState => ({
      email,
      validity: { ...oldState.validity, email: !!validity },
    }))
  }

  onChangePassword({ target: { value: password } }) {
    this.setState({ password })
  }

  getValidity() {
    return this.state.validity.email
  }

  handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && this.getValidity()) {
      e.preventDefault()
      const { onSubmit } = this.props
      const { email, password } = this.state
      onSubmit({ email, password })
    }
  }

  render() {
    const { onSubmit, classes } = this.props
    const { email, password } = this.state
    return (
      <Container component="main">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Ingresar
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              autoFocus
              type="email"
              value={email}
              onChange={this.onChangeEmail}
              onKeyPress={this.handleEnter}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={this.onChangePassword}
              onKeyPress={this.handleEnter}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!this.getValidity()}
              onClick={() => onSubmit({ email, password })}
            >
              Ingresar
            </Button>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <Link to={routes.recover} variant="body2">
                  ¿Olvidaste tu contraseña?
                </Link>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.alignRight}>
                <Link to={routes.signUp} variant="body2">
                  {'¿No tienes una cuenta? Registrate'}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    )
  }
}

SignInForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SignInForm)
