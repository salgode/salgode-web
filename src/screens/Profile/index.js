import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './style.sass'
import { fetchUserVehicles } from '../../redux/actions/vehicles'
import ProfileCard from '../../components/Profile/ProfileCard.js'

export class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      vehicles: [],
    }
    this.getVehicles = this.getVehicles.bind(this)
  }
  async getVehicles() {
    this.setState({ loading: true })
    // console.log(this.props.user.token)
    const response = await this.props.fetchVehicles(12345) // this.props.user.token

    if (response.error) {
      this.setState({ loading: false })
      alert(
        'Error obteniendo Vehiculos',
        'Hubo un problema obteniendo los vehiculos. Por favor intentalo de nuevo.'
      )
    }
    this.setState({ vehicles: this.props.vehicles.vehicles, loading: false })
  }

  componentDidMount() {
    this.getVehicles()
  }

  render() {
    const { loading, vehicles } = this.state
    if (!loading) {
      return (
        <div>
          <div>
            <br />
            <ProfileCard user={this.props.user} vehiculos={vehicles} />
          </div>
        </div>
      )
    } else {
      return <div> Loading...</div>
    }
  }
}

Profile.propTypes = {
  fetchVehicles: PropTypes.func.isRequired,
  user: PropTypes.shape({
    token: PropTypes.string,
    userId: PropTypes.string,
  }).isRequired,
  vehicles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}

const mapDispatchToProps = dispatch => ({
  fetchVehicles: token => dispatch(fetchUserVehicles(token)),
})

const mapStateToProps = state => ({
  user: state.user,
  vehicles: state.vehicles,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
