import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// redux
import { updateUser } from '../../redux/actions/updateUser'
import { updateUserData } from '../../redux/actions/user'
import {
  fetchUserVehicles,
  updateUserVehicle,
} from '../../redux/actions/vehicles'

// components
import { Grid, Button } from '@material-ui/core'
import { UpdateForm } from '../../components/User'
import Loading from '../../components/Loading/Loading'

// utils
import uploadFile from '../../utils/uploadFile'
import { setObject, USER_DATA } from '../../utils/storeData'
import routes from '../../routes'

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
      loading: false,
    }
    this.onChangeName = this.onChangeName.bind(this)
    this.onChangeLastName = this.onChangeLastName.bind(this)
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this)
    this.onChangeAlias = this.onChangeAlias.bind(this)
    this.onChangeBrand = this.onChangeBrand.bind(this)
    this.onChangeModel = this.onChangeModel.bind(this)
    this.onChangeColor = this.onChangeColor.bind(this)
    this.onChangeIdentification = this.onChangeIdentification.bind(this)
    this.setVehicle = this.setVehicle.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.uploadAllImages = this.uploadAllImages.bind(this)
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
    if (this.props.vehicles.vehicles.length) {
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
    this.setState({ loading: false })
  }

  async onSubmit() {
    this.setState({ loading: true })
    const { name, lastName, phone } = this.state
    const { token } = this.props.user
    const imgs = await this.uploadAllImages()
    const updateData = { name, lastName, phone, imgs }
    const response = await this.props.updateUser(token, updateData)
    if (response.payload.data.success) {
      const data = { name, lastName, phone, ...imgs }
      setObject(USER_DATA, { ...this.props.user, ...data })
      this.props.updateUserData(data)
    }
    const vehicle_data = this.getVehicleData()
    if (this.state.hasVehicle) {
      this.props.updateUserVehicle(token, vehicle_data)
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
      })
    }
    if (this.uploadDniFront.current.files.length !== 0) {
      dniFront = uploadFile(this.uploadDniFront).then(res => {
        images.dniFrontLink = res.image_urls.fetch
      })
    }
    if (this.uploadDniBack.current.files.length !== 0) {
      dniBack = uploadFile(this.uploadDniBack).then(res => {
        images.dniBackLink = res.image_urls.fetch
      })
    }
    if (this.uploadDriFront.current.files.length !== 0) {
      driFront = uploadFile(this.uploadDriFront).then(res => {
        images.driFrontLink = res.image_urls.fetch
      })
    }
    if (this.uploadDriBack.current.files.length !== 0) {
      driBack = uploadFile(this.uploadDriBack).then(res => {
        images.driBackLink = res.image_urls.fetch
      })
    }
    await Promise.all([avatar, dniFront, dniBack, driFront, driBack])
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

  onChangeLastName({ target: { value: lastName } }) {
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
      loading,
    } = this.state
    return (
      <Grid container spacing={2}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <UpdateForm
              name={name}
              lastName={lastName}
              phone={phone}
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
                className={classes.submit}
                // disabled={!this.getValidity()}
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
  history: PropTypes.object.isRequired,
}

const mapDispatchToProps = {
  updateUser,
  updateUserData,
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
