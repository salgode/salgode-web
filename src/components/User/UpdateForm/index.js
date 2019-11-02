/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { updateUser } from '../../../redux/actions/updateUser'
import { fetchUser } from '../../../redux/actions/user'
import { fetchUserVehicles } from '../../../redux/actions/vehicles'
import { Typography, Grid, TextField, Button } from '@material-ui/core'
import uploadFile from '../../../utils/uploadFile'
import routes from '../../../routes.js'

class UpdateForm extends Component {
  constructor(props) {
    super(props)
    const { name, lastName, phone } = props.user
    this.state = {
      name,
      lastName,
      phone,
      validity: {
        name: true,
        lastName: true,
        phone: true,
      },
    }
    this.onChangeName = this.onChangeName.bind(this)
    this.onChangeLastname = this.onChangeLastname.bind(this)
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this)
    this.uploadAvatar = React.createRef()
    this.uploadDniFront = React.createRef()
    this.uploadDniBack = React.createRef()
  }

  componentDidMount() {
    const { name, lastName, phone } = this.props.user
    this.setState({
      name,
      lastName,
      phone,
      validity: {
        name: true,
        lastName: true,
        phone: true,
      },
    })
  }

  async onSubmit(data) {
    const { token } = this.props.user
    const imgs = await this.uploadAllImages()
    data.imgs = imgs
    await this.props.updateUser(token, data)
    this.props.fetchUser(token)
  }

  async uploadAllImages() {
    const images = {}

    if (this.uploadAvatar.current.files.length !== 0) {
      const res = await uploadFile(this.uploadAvatar)
      images.avatar = res.image_urls.fetch
    }
    if (this.uploadDniFront.current.files.length !== 0) {
      const res = await uploadFile(this.uploadDniFront)
      images.dniFront = res.image_urls.fetch
    }
    if (this.uploadDniBack.current.files.length !== 0) {
      const res = await uploadFile(this.uploadDniBack)
      images.dniBack = res.image_urls.fetch
    }
    return images
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

  onChangePhoneNumber({ target: { value: phone } }) {
    phone = phone.replace(/ /g, '')
    const validity = phone.match(/^[+]?\d{11}$/)
    this.setState(oldState => ({
      phone,
      validity: { ...oldState.validity, phone: !!validity },
    }))
  }

  // onChangeName({ target: { value: name } }) {
  //   this.setState(oldState => ({
  //     name,
  //     validity: { ...oldState.validity, name: name.length > 2 },
  //   }))
  // }

  render() {
    const classes = {}
    const { name, lastName, phone, hasCar } = this.state
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h4">
            Datos del usuario
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Nombre"
            autoFocus
            value={name}
            onChange={this.onChangeName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Apellido"
            value={lastName}
            onChange={this.onChangeLastname}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Número de Teléfono"
            name="phoneNumber"
            value={phone}
            onChange={this.onChangePhone}
          />
        </Grid>
        <Grid item xs={4}>
          <div className="field">
            <label htmlFor="Avatar">Selfie</label>
            <div className="control">
              <input
                ref={this.uploadAvatar}
                id="file-upload-avatar"
                type="file"
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="field">
            <label htmlFor="Avatar">Cedula frontal</label>
            <div className="control">
              <input
                ref={this.uploadDniFront}
                id="file-upload-avatar"
                type="file"
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="field">
            <label htmlFor="Avatar">Cedula posterior</label>
            <div className="control">
              <input
                ref={this.uploadDniBack}
                id="file-upload-avatar"
                type="file"
              />
            </div>
          </div>
        </Grid>
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.submit}
          // disabled={!this.getValidity()}
          onClick={() =>
            this.onSubmit({
              name,
              lastName,
              phone,
            })
          }
        >
          Actualizar
        </Button>
      </Grid>
    )
  }
}

UpdateForm.propTypes = {
  user: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  updateUser: (token, data) => dispatch(updateUser(token, data)),
  fetchUser: token => dispatch(fetchUser(token)),
})

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateForm)
