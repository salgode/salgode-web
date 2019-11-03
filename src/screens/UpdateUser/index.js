import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { updateUser } from '../../redux/actions/updateUser'
import {
  fetchUserVehicles,
  updateUserVehicle,
} from '../../redux/actions/vehicles'
import {
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
} from '@material-ui/core'
import uploadFile from '../../utils/uploadFile'
import { setObject, USER_DATA } from '../../utils/storeData'

class UpdateUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      lastName: '',
      phone: '',
      alias: '',
      brand: '',
      model: '',
      color: '',
      seats: 0,
      identification: '',
      validity: {
        name: true,
        lastName: true,
        phone: true,
      },
      hasVehicle: false,
    }
    this.onChangeName = this.onChangeName.bind(this)
    this.onChangeLastname = this.onChangeLastname.bind(this)
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this)
    this.onChangeAlias = this.onChangeAlias.bind(this)
    this.onChangeBrand = this.onChangeBrand.bind(this)
    this.onChangeModel = this.onChangeModel.bind(this)
    this.onChangeColor = this.onChangeColor.bind(this)
    this.onChangeIdentification = this.onChangeIdentification.bind(this)
    this.setVehicle = this.setVehicle.bind(this)
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
    this.setVehicle()
  }

  async setVehicle() {
    const { vehicles } = this.props.vehicles
    if (!vehicles.length) {
      await this.props.fetchUserVehicles(this.props.user.token)
    }
    if (!this.props.vehicles.vehicles.length) {
      const {
        alias,
        vehicle_attributes: { model, color, brand, seats },
        vehicle_identifications: { identification },
      } = this.props.vehicles.vehicles[0]
      this.setState({
        alias,
        model,
        color,
        brand,
        seats,
        identification,
        hasVehicle: true,
      })
    }
  }

  async onSubmit(data) {
    const { token } = this.props.user
    const imgs = await this.uploadAllImages()
    const updateData = { ...data, imgs }
    const response = await this.props.updateUser(token, updateData)
    if (response.payload.data.success) {
      setObject(USER_DATA, { ...this.props.user, ...data, ...imgs })
    }
    const vehicle_data = this.getVehicleData()
    if (this.state.hasVehicle) {
      this.props.updateUserVehicle(token, vehicle_data)
      this.props.fetchUserVehicles(token)
    }
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

  getVehicleData() {
    const { alias, model, color, brand, seats, identification } = this.state
    const { vehicle_id } = this.props.vehicles.vehicles[0]
    const vehicle_data = {
      vehicle_id,
      alias,
      vehicle_attributes: { model, color, brand, seats },
      vehicle_identifications: { identification },
    }
    return vehicle_data
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

  onChangeAlias({ target: { value: alias } }) {
    this.setState({ alias })
  }

  onChangeBrand({ target: { value: brand } }) {
    this.setState({ brand })
  }
  onChangeModel({ target: { value: model } }) {
    this.setState({ model })
  }
  onChangeColor({ target: { value: color } }) {
    this.setState({ color })
  }
  onChangeIdentification({ target: { value: identification } }) {
    this.setState({ identification })
  }
  onChangeSeats({ target: { value: seats } }) {
    this.setState({ seats })
  }

  render() {
    const classes = {}
    const {
      name,
      lastName,
      phone,
      hasVehicle,
      alias,
      brand,
      model,
      color,
      identification,
      seats,
    } = this.state
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
        {!hasVehicle ? null : (
          <>
            <Grid item xs={12}>
              <Typography component="h1" variant="h4">
                Datos del vehículo
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                variant="outlined"
                fullWidth
                label="Alias"
                autoFocus
                value={alias}
                onChange={this.onChangeAlias}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                variant="outlined"
                fullWidth
                label="Marca"
                value={brand}
                onChange={this.onChangeBrand}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                variant="outlined"
                fullWidth
                label="Modelo"
                value={model}
                onChange={this.onChangeModel}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                variant="outlined"
                fullWidth
                label="Color"
                value={color}
                onChange={this.onChangeColor}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                variant="outlined"
                fullWidth
                label="Patente"
                value={identification}
                onChange={this.onChangeIdentification}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                required
                variant="outlined"
                fullWidth
                label="Asientos"
                type="number"
                min={0}
                max={20}
                value={seats}
                onChange={this.onChangeSeats}
              >
                {[...Array(20).keys()].map(i => (
                  <MenuItem key={i} value={i}>
                    {i}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </>
        )}

        <Button
          type="button"
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

UpdateUser.propTypes = {
  user: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
  vehicles: PropTypes.object.isRequired,
  fetchUserVehicles: PropTypes.func.isRequired,
  updateUserVehicle: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  updateUser,
  fetchUserVehicles,
  updateUserVehicle,
}

const mapStateToProps = state => ({
  user: state.user,
  vehicles: state.vehicles,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateUser)
