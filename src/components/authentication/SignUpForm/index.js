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
import Loading from '../../Loading/Loading'
import UploadImage from '../../UploadImage'

// utils
import {
  formatPhone,
  notWrongPhone,
  validPhone,
} from '../../../utils/userInputs'
import uploadFile from '../../../utils/uploadFile'
import './style.sass'

const ERROR = {
  name: 'Tu nombre debe tener más de 3 caracteres',
  lastName: 'Tu apellido debe tener más de 3 caracteres',
  email: 'Tu mail tiene el formato incorrecto',
  phoneNumber: 'Tu teléfono tiene el formato incorrecto',
  password: 'Tu contraseña debe tener al menos 8 caracteres',
  passwordRepeat: 'Tus contraseñas no coinciden',
  selfie: 'Debes subir una foto selfie',
  idFront: 'Debes subir una foto frontal de tu carnet',
  idBack: 'Debes subir una foto trasera de tu carnet',
}

const PHOTO_SUBTITLE = {
  selfieImage: '¡Sonríe! Esta foto la verán los demás usuarios.',
  idFront:
    '¡Que salga lo mejor posible! Influirá en la validación de tu cuenta.',
  idBack:
    '¡Que salga lo mejor posible! Influirá en la validación de tu cuenta.',
}

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '50%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  main: {
    padding: 0,
  },
  [theme.breakpoints.down('sm')]: {
    form: {
      width: '100%',
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
      validity: {
        ...oldState.validity,
        password: password.length > 7,
        passwordRepeat: password === this.state.passwordRepeat,
      },
    }))
  }

  onChangePasswordRepeat({ target: { value: passwordRepeat } }) {
    this.setState(oldState => ({
      passwordRepeat,
      validity: {
        ...oldState.validity,
        passwordRepeat:
          passwordRepeat.length > 7 && passwordRepeat === this.state.password,
      },
    }))
  }

  onChangeImage = name => {
    this.setState(oldState => ({
      validity: {
        ...oldState.validity,
        [name]: true,
      },
    }))
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
    return validity
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
      alert('Asegurate de haber subido las 3 fotos')
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
      validity,
    } = this.state
    const { classes } = this.props

    const error = {}
    Object.keys(validity).map(key => {
      if (
        !validity[key] &&
        (typeof this.state[key] === 'undefined' || this.state[key].length > 0)
      ) {
        error[key] = ERROR[key]
      } else {
        error[key] = ''
      }
    })

    return (
      <Container component="main" className={classes.main}>
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
                  error={error.name.length > 0}
                  helperText={error.name}
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
                  error={error.lastName.length > 0}
                  helperText={error.lastName}
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
                  error={error.email.length > 0}
                  helperText={error.email}
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
                  error={error.phoneNumber.length > 0}
                  helperText={error.phoneNumber}
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
                  error={error.password.length > 0}
                  helperText={error.password}
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
                  error={error.passwordRepeat.length > 0}
                  helperText={error.passwordRepeat}
                  value={passwordRepeat}
                  onChange={this.onChangePasswordRepeat}
                  onKeyPress={this.handleEnter}
                />
              </Grid>
              <Grid container item xs={12} md={12} justify="center">
                <UploadImage
                  id="selfieImage"
                  title="Selfie"
                  subtitle={PHOTO_SUBTITLE['selfieImage']}
                  onChange={() => this.onChangeImage('selfieImage')}
                  ref={this.selfieImage}
                />
              </Grid>
              <Grid container item xs={12} md={12} justify="center">
                <UploadImage
                  id="idFront"
                  title="Foto frontal carnet"
                  subtitle={PHOTO_SUBTITLE['idFront']}
                  onChange={() => this.onChangeImage('idFront')}
                  ref={this.idFront}
                />
              </Grid>
              <Grid container item xs={12} md={12} justify="center">
                <UploadImage
                  id="idBack"
                  title="Foto trasera carnet"
                  subtitle={PHOTO_SUBTITLE['idBack']}
                  onChange={() => this.onChangeImage('idBack')}
                  ref={this.idBack}
                />
              </Grid>
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
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
