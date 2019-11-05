import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// redux
import { updateUser } from '../../redux/actions/updateUser'
import { updateUserData } from '../../redux/actions/user'
import {
  fetchUserVehicles,
  updateUserVehicle,
  createUserVehicle,
} from '../../redux/actions/vehicles'

// components
import { Grid, Button } from '@material-ui/core'
import { UpdateForm } from '../../components/User'
import Loading from '../../components/Loading/Loading'
import SimpleBreadcrumbs from '../../components/Breadcrumbs/index'

// utils
import uploadFile from '../../utils/uploadFile'
import { setObject, USER_DATA } from '../../utils/storeData'
import routes from '../../routes'
import { formatPhone, notWrongPhone, validPhone } from '../../utils/userInputs'

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
        alias: true,
        brand: true,
        model: true,
        color: true,
        seats: true,
        identification: true,
      },
      hasVehicle: false,
      newVehicle: true,
      loading: false,
    }
    this.onChangeName = this.onChangeName.bind(this)
    this.onChangeLastName = this.onChangeLastName.bind(this)
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this)
    this.formatPhoneCL = this.formatPhoneCL.bind(this)
    this.onChangeAlias = this.onChangeAlias.bind(this)
    this.onChangeBrand = this.onChangeBrand.bind(this)
    this.onChangeModel = this.onChangeModel.bind(this)
    this.onChangeColor = this.onChangeColor.bind(this)
    this.onChangeSeats = this.onChangeSeats.bind(this)
    this.onChangeIdentification = this.onChangeIdentification.bind(this)
    this.onChangeHasVehicle = this.onChangeHasVehicle.bind(this)
    this.setVehicle = this.setVehicle.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.uploadAllImages = this.uploadAllImages.bind(this)
    this.getValidity = this.getValidity.bind(this)
    this.uploadAvatar = React.createRef()
    this.uploadDniFront = React.createRef()
    this.uploadDniBack = React.createRef()
    this.uploadDriFront = React.createRef()
    this.uploadDriBack = React.createRef()
  }

  componentDidMount() {
    const { name, lastName, phone } = this.props.user
    this.setState({
      name,
      lastName,
      phone,
      loading: true,
    })
    this.setVehicle()
  }

  async setVehicle() {
    const { vehicles } = this.props.user
    if (vehicles.length > 0) {
      const {
        alias,
        vehicle_attributes: { model, color, brand, seats },
        vehicle_identifications: { identification },
      } = vehicles[0]
      this.setState({
        alias,
        model,
        color,
        brand,
        seats,
        identification,
        hasVehicle: true,
        newVehicle: false,
        loading: false,
      })
    } else {
      this.setState({
        validity: {
          name: true,
          lastName: true,
          phone: true,
          alias: false,
          brand: false,
          model: false,
          color: false,
          seats: false,
          identification: false,
        },
        loading: false,
      })
    }
  }

  async onSubmit() {
    this.setState({ loading: true })
    const { name, lastName, phone, hasVehicle, newVehicle } = this.state
    const { token } = this.props.user
    const imgs = await this.uploadAllImages()
    const updateData = { name, lastName, phone, imgs }
    const response = await this.props.updateUser(token, updateData)
    let vehicle_data = this.getVehicleData()
    let vehicles_response = {}
    if (hasVehicle) {
      if (!newVehicle) {
        vehicles_response = await this.props.updateUserVehicle(
          token,
          vehicle_data
        )
      } else {
        vehicles_response = await this.props.createUserVehicle(
          token,
          vehicle_data
        )
      }
    }
    if (response.payload.data.success) {
      let vehicles = []
      if (hasVehicle) {
        if (newVehicle) {
          const vehicle_id = vehicles_response.payload.data.resource_id
          vehicle_data = { vehicle_id, ...vehicle_data }
        }
        vehicles = [vehicle_data]
      }
      const data = { name, lastName, phone, ...imgs, vehicles }
      setObject(USER_DATA, { ...this.props.user, ...data })
      this.props.updateUserData(data)
    }
    this.setState({ loading: false })
    this.props.history.push(routes.profile)
  }

  async uploadAllImages() {
    const images = {}
    let avatar, dniFront, dniBack, driFront, driBack

    if (this.uploadAvatar.current.files.length !== 0) {
      avatar = uploadFile(this.uploadAvatar).then(res => {
        images.selfieLink = res.image_urls.fetch
        images.selfieID = res.image_id
      })
    }
    if (this.uploadDniFront.current.files.length !== 0) {
      dniFront = uploadFile(this.uploadDniFront).then(res => {
        images.dniFrontLink = res.image_urls.fetch
        images.dniFrontID = res.image_id
      })
    }
    if (this.uploadDniBack.current.files.length !== 0) {
      dniBack = uploadFile(this.uploadDniBack).then(res => {
        images.dniBackLink = res.image_urls.fetch
        images.dniBackID = res.image_id
      })
    }
    if (this.uploadDriFront.current.files.length !== 0) {
      driFront = uploadFile(this.uploadDriFront).then(res => {
        images.driFrontLink = res.image_urls.fetch
        images.driFrontID = res.image_id
      })
    }
    if (this.uploadDriBack.current.files.length !== 0) {
      driBack = uploadFile(this.uploadDriBack).then(res => {
        images.driBackLink = res.image_urls.fetch
        images.driBackID = res.image_id
      })
    }
    await Promise.all([avatar, dniFront, dniBack, driFront, driBack])
    return images
  }

  getVehicleData() {
    const {
      alias,
      model,
      color,
      brand,
      seats,
      identification,
      newVehicle,
    } = this.state
    if (!newVehicle) {
      const { vehicle_id } = this.props.user.vehicles[0]
      const vehicle_data = {
        vehicle_id,
        alias,
        vehicle_attributes: { model, color, brand, seats },
        vehicle_identifications: { identification },
      }
      return vehicle_data
    } else {
      const vehicle_data = {
        alias,
        vehicle_attributes: { model, color, brand, seats, type: 'car' },
        vehicle_identifications: {
          identification,
          type: 'license_plate',
          country: 'CL',
        },
      }
      return vehicle_data
    }
  }

  onChangeName({ target: { value: name } }) {
    this.setState(oldState => ({
      name,
      validity: { ...oldState.validity, name: name.length > 2 },
    }))
  }

  onChangeLastName({ target: { value: lastName } }) {
    this.setState(oldState => ({
      lastName,
      validity: { ...oldState.validity, lastName: lastName.length > 2 },
    }))
  }

  onChangePhoneNumber({ target: { value: phone } }) {
    if (notWrongPhone(phone)) {
      phone = formatPhone(phone)
      const validity = validPhone(phone)
      this.setState(oldState => ({
        phone,
        validity: { ...oldState.validity, phone: !!validity },
      }))
    }
  }

  formatPhoneCL() {
    if (!/^\+56 9/g.test(this.state.phone)) {
      this.setState({ phone: '+56 9' })
    }
  }

  onChangeAlias({ target: { value: alias } }) {
    this.setState(oldState => ({
      alias,
      validity: { ...oldState.validity, alias: alias.length > 2 },
    }))
  }

  onChangeBrand({ target: { value: brand } }) {
    this.setState(oldState => ({
      brand,
      validity: { ...oldState.validity, brand: brand.length > 2 },
    }))
  }
  onChangeModel({ target: { value: model } }) {
    this.setState(oldState => ({
      model,
      validity: { ...oldState.validity, model: model.length > 2 },
    }))
  }
  onChangeColor({ target: { value: color } }) {
    this.setState(oldState => ({
      color,
      validity: { ...oldState.validity, color: color.length > 2 },
    }))
  }
  onChangeIdentification({ target: { value: identification } }) {
    this.setState(oldState => ({
      identification,
      validity: {
        ...oldState.validity,
        identification: identification.length > 2,
      },
    }))
  }
  onChangeSeats({ target: { value: seats } }) {
    this.setState(oldState => ({
      seats,
      validity: { ...oldState.validity, seats: seats >= 0 && seats < 20 },
    }))
  }

  onChangeHasVehicle({ target: { checked: hasVehicle } }) {
    this.setState({ hasVehicle })
  }

  getValidity() {
    const validity =
      this.state.validity.name &&
      this.state.validity.lastName &&
      this.state.validity.phone
    const with_car =
      this.state.validity.alias &&
      this.state.validity.brand &&
      this.state.validity.model &&
      this.state.validity.color &&
      this.state.validity.identification &&
      this.state.validity.seats
    if (this.state.hasVehicle) {
      return validity && with_car
    }
    return validity
  }

  render() {
    const {
      name,
      lastName,
      hasVehicle,
      alias,
      brand,
      model,
      color,
      identification,
      seats,
      loading,
    } = this.state
    let { phone } = this.state
    if (!phone.includes('+')) phone = '+' + phone
    const formatedPhone = formatPhone(phone)
    const breadcrumb = {
      'Mi Perfil': 'profile',
      'Editar Perfil': '/',
    }
    return (
      <Grid container spacing={2}>
        <SimpleBreadcrumbs antecesors={breadcrumb} />
        {loading ? (
          <Loading />
        ) : (
          <>
            <UpdateForm
              name={name}
              lastName={lastName}
              phone={formatedPhone}
              alias={alias}
              model={model}
              color={color}
              brand={brand}
              seats={seats}
              identification={identification}
              hasVehicle={hasVehicle}
              onChangeName={this.onChangeName}
              onChangeLastName={this.onChangeLastName}
              onChangePhoneNumber={this.onChangePhoneNumber}
              onChangeAlias={this.onChangeAlias}
              onChangeBrand={this.onChangeBrand}
              onChangeIdentification={this.onChangeIdentification}
              onChangeSeats={this.onChangeSeats}
              onChangeColor={this.onChangeColor}
              onChangeModel={this.onChangeModel}
              onChangeHasVehicle={this.onChangeHasVehicle}
              formatPhoneCL={this.formatPhoneCL}
              ref={{
                uploadAvatar: this.uploadAvatar,
                uploadDniFront: this.uploadDniFront,
                uploadDniBack: this.uploadDniBack,
                uploadDriFront: this.uploadDriFront,
                uploadDriBack: this.uploadDriBack,
              }}
            ></UpdateForm>
            <Grid item xs={12}>
              <Button
                type="button"
                variant="contained"
                color="secondary"
                disabled={!this.getValidity()}
                onClick={this.onSubmit}
              >
                Actualizar
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    )
  }
}

UpdateUser.propTypes = {
  user: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
  updateUserData: PropTypes.func.isRequired,
  vehicles: PropTypes.object.isRequired,
  fetchUserVehicles: PropTypes.func.isRequired,
  updateUserVehicle: PropTypes.func.isRequired,
  createUserVehicle: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}

const mapDispatchToProps = {
  updateUser,
  updateUserData,
  fetchUserVehicles,
  updateUserVehicle,
  createUserVehicle,
}

const mapStateToProps = state => ({
  user: state.user,
  vehicles: state.vehicles,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateUser)
