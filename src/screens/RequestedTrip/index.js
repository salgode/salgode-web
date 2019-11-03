import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Store
import { fetchRequestedTrips } from '../../redux/actions/requestedTrip'

// Components
import { RequestedTripCard } from '../../components/MyTripsCard/index'
import EmptyState from '../../components/EmptyState/index'
import Loading from '../../components/Loading/Loading'
import SimpleBreadcrumbs from '../../components/Breadcrumbs/index'

import Grid from '@material-ui/core/Grid'

class RequestedTrip extends Component {
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
    const response = await this.props.fetchRequestedTrips(this.props.user.token)

    if (response.error) {
      alert(
        'Error obteniendo viajes',
        'Hubo un problema obteniendo los viajes. Por favor intentalo de nuevo.'
      )
    }

    this.setState({ trips: this.props.requestedTrips.trips, loading: false })
  }

  renderTrips(trips) {
    if (trips && trips.length > 0) {
      return trips.map((trip, i) => {
        return (
          <Grid item md={4} key={i}>
            <RequestedTripCard trip={trip} />
          </Grid>
        )
      })
    } else {
      return <EmptyState text="No tienes reservas" />
    }
  }

  render() {
    const { loading, trips } = this.state
    if (loading) return <Loading />

    const breadcrumb = {
      Pasajero: '/',
      Reservas: '/',
    }
    return (
      <div>
        <SimpleBreadcrumbs antecesors={breadcrumb} />
        <Grid container spacing={2} justify="center" alignItems="center">
          {this.renderTrips(trips)}
        </Grid>
      </div>
    )
  }
}

RequestedTrip.propTypes = {
  fetchRequestedTrips: PropTypes.func.isRequired,
  user: PropTypes.shape({
    token: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  }).isRequired,
  requestedTrips: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  trips: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}

const mapDispatchToProps = dispatch => ({
  fetchRequestedTrips: token => dispatch(fetchRequestedTrips(token)),
})

const mapStateToProps = state => ({
  user: state.user,
  requestedTrips: state.requestedTrips,
  trips: state.findTrips.trips,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestedTrip)
