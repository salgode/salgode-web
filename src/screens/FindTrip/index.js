import React from 'react'
import PropTypes from 'prop-types'

import { Container } from '@material-ui/core'
import FindTripsCard from './../../components/FindTripsCard/index'
import './style.sass'

import { fetchAllFutureTrips } from '../../redux/actions/allTrips'

import { connect } from 'react-redux'

class FindTripScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      trips: [],
    }
    this.getTrips = this.getTrips.bind(this)
  }

  componentDidMount() {
    this.getTrips()
  }

  async getTrips() {
    this.setState({ loading: true })
    // console.log(this.props)
    const response = await this.props.fetchAllFutureTrips(12345) // this.props.user.token

    if (response.error) {
      this.setState({ loading: false })
      alert(
        'Error obteniendo viajes',
        'Hubo un problema obteniendo los viajes. Por favor intentalo de nuevo.'
      )
    }

    this.setState({ trips: this.props.allFutureTrips.trips, loading: false })
  }

  render() {
    const { trips } = this.state
    return (
      <div className="find-trip">
        <Container>
          {trips.map((trip, i) => (
            <FindTripsCard trip={trip} key={i} />
          ))}
        </Container>
      </div>
    )
  }
}

FindTripScreen.propTypes = {
  fetchAllFutureTrips: PropTypes.func.isRequired,
  allFutureTrips: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}

const mapDispatchToProps = dispatch => ({
  fetchAllFutureTrips: token => dispatch(fetchAllFutureTrips(token)),
})

const mapStateToProps = state => ({
  user: state.user,
  allFutureTrips: state.allFutureTrips,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FindTripScreen)
