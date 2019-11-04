import React, { Component, createRef } from 'react'
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

// utils
import {
  formatPhone,
  notWrongPhone,
  validPhone,
} from '../../../utils/userInputs'
import uploadFile from '../../../utils/uploadFile'
import './style.sass'
import Loading from '../../Loading/Loading'

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
    marginTop: theme.spacing(3),
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
})

class SignUpForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      passwordRepeat: '',
      selfie: '',
      loading: false,

      validity: {
        name: false,
        lastName: false,
        email: false,
        phoneNumber: false,
        password: false,
        passwordRepeat: false,
        selfieImage: false,
        idFront: false,
        idBack: false,
      },
    }
    this.selfieImage = createRef()
    this.idFront = createRef()
    this.idBack = createRef()
    this.onChangeName = this.onChangeName.bind(this)
    this.onChangeLastname = this.onChangeLastname.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this)
    this.formatPhoneCL = this.formatPhoneCL.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.onChangePasswordRepeat = this.onChangePasswordRepeat.bind(this)

    this.getValidity = this.getValidity.bind(this)
  }

  formatPhoneCL() {
    if (!/^\+56 9/g.test(this.state.phoneNumber)) {
      this.setState({ phoneNumber: '+56 9' })
    }
  }

  onChangeName({ target: { value: name } }) {
    this.setState(oldState => ({
      name,
      validity: { ...oldState.validity, name: name.length > 2 },
    }))
  }

  onChangeLastname({ target: { value: lastName } }) {
    this.setState(oldState => ({
      lastName,
      validity: { ...oldState.validity, lastName: lastName.length > 2 },
    }))
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

  onChangePhoneNumber({ target: { value: phoneNumber } }) {
    if (notWrongPhone(phoneNumber)) {
      phoneNumber = formatPhone(phoneNumber)
      const validity = validPhone(phoneNumber)
      this.setState(oldState => ({
        phoneNumber: phoneNumber,
        validity: { ...oldState.validity, phoneNumber: !!validity },
      }))
    }
  }

  onChangePassword({ target: { value: password } }) {
    this.setState(oldState => ({
      password,
      validity: { ...oldState.validity, password: password.length > 3 },
    }))
  }

  onChangePasswordRepeat({ target: { value: passwordRepeat } }) {
    this.setState(oldState => ({
      passwordRepeat,
      validity: {
        ...oldState.validity,
        passwordRepeat: passwordRepeat.length > 3,
      },
    }))
  }

  onChangeImage = name => event => {
    if (event.currentTarget) {
      this.setState(oldState => ({
        validity: {
          ...oldState.validity,
          [name]: true,
        },
      }))
    }
  }

  async onImageUpload(image) {
    const response = await uploadFile(image)
    if (response.error) {
      return alert(
        'Hubo un problema subiendo la imagen. Por favor intentalo de nuevo.'
      )
    }
    return response.image_id
  }

  validateImagesExists() {
    const preImage =
      this.selfieImage.current !== null &&
      this.idFront.current !== null &&
      this.idBack.current !== null
    const images =
      preImage &&
      this.selfieImage.current.files.length !== 0 &&
      this.idFront.current.files.length !== 0 &&
      this.idBack.current.files.length !== 0
    return images
  }

  getValidity() {
    const validity =
      this.state.validity.name &&
      this.state.validity.lastName &&
      this.state.validity.email &&
      this.state.validity.phoneNumber &&
      this.state.validity.password &&
      this.state.validity.passwordRepeat &&
      this.state.validity.selfieImage &&
      this.state.validity.idFront &&
      this.state.validity.idBack
    return validity && this.state.password === this.state.passwordRepeat
  }

  async submit() {
    const { onSubmit } = this.props
    const {
      name,
      lastName,
      email,
      password,
      passwordRepeat,
      phoneNumber,
    } = this.state
    if (this.getValidity() && this.validateImagesExists()) {
      this.setState({ loading: true })
      const formatedPhone = formatPhone(phoneNumber)
      const selfieLink = await this.onImageUpload(this.selfieImage)
      const dniFrontLink = await this.onImageUpload(this.idFront)
      const dniBackLink = await this.onImageUpload(this.idBack)
      this.setState({ loading: false })
      onSubmit({
        name,
        lastName,
        email,
        phone: formatedPhone,
        password,
        passwordRepeat,
        selfieLink,
        dniFrontLink,
        dniBackLink,
      })
    } else {
      alert('Asegurate de tener todos los campos completos')
    }
  }

  handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && this.getValidity()) {
      e.preventDefault()
      this.submit()
    }
  }

  render() {
    const {
      name,
      lastName,
      email,
      password,
      passwordRepeat,
      phoneNumber,
      loading,
    } = this.state
    const { classes } = this.props

    return (
      <Container component="main">
        {loading && <Loading />}
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Registrarse
          </Typography>

          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Nombre"
                  autoFocus
                  value={name}
                  onChange={this.onChangeName}
                  onKeyPress={this.handleEnter}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Apellido"
                  name="lastName"
                  autoComplete="lname"
                  value={lastName}
                  onChange={this.onChangeLastname}
                  onKeyPress={this.handleEnter}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="E-mail"
                  name="email"
                  autoComplete="email"
                  type="email"
                  value={email}
                  onChange={this.onChangeEmail}
                  onKeyPress={this.handleEnter}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Número de Teléfono"
                  type="tel"
                  value={phoneNumber}
                  onChange={this.onChangePhoneNumber}
                  onKeyPress={this.handleEnter}
                  onFocus={this.formatPhoneCL}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Contraseña"
                  id="password"
                  autoComplete="current-password"
                  type="password"
                  value={password}
                  onChange={this.onChangePassword}
                  onKeyPress={this.handleEnter}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Confirma tu contraseña"
                  id="passwordRepeat"
                  autoComplete="current-password"
                  type="password"
                  value={passwordRepeat}
                  onChange={this.onChangePasswordRepeat}
                  onKeyPress={this.handleEnter}
                />
              </Grid>
              <Grid container item xs={12} md={12} justify="center">
                <Grid item xs={12} sm={12}>
                  <Typography className="image-center">Selfie</Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <input
                    type="file"
                    ref={this.selfieImage}
                    onChange={this.onChangeImage('selfieImage')}
                  />
                </Grid>
              </Grid>
              <Grid container item xs={12} md={12} justify="center">
                <Grid item xs={12} sm={12}>
                  <Typography className="image-center">
                    Foto frontal Cédula de Identidad
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <input
                    type="file"
                    ref={this.idFront}
                    onChange={this.onChangeImage('idFront')}
                  />
                </Grid>
              </Grid>
              <Grid container item xs={12} md={12} justify="center">
                <Grid item xs={12} sm={12}>
                  <Typography className="image-center">
                    Foto trasera Cédula de Identidad
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <input
                    type="file"
                    ref={this.idBack}
                    onChange={this.onChangeImage('idBack')}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              disabled={!this.getValidity()}
              onClick={() => this.submit()}
            >
              Registrarse
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/" variant="body2">
                  ¿Ya tienes una cuenta? Ingresa
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    )
  }
}

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SignUpForm)
