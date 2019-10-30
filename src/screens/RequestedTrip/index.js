import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Store
import { fetchRequestedTrips } from '../../redux/actions/requestedTrip'
import { RequestedTripCard } from '../../components/MyTripsCard/index'

// Components
import Loading from '../../components/Loading/Loading'
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

  render() {
    const { loading, trips } = this.state
    return (
      <div>
        {loading && <Loading />}
        <Grid container spacing={2} justify="center" alignItems="center">
          {trips.map((trip, i) => {
            return (
              <Grid item md={4} key={i}>
                <RequestedTripCard trip={trip} />
              </Grid>
            )
          })}
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
}

const mapDispatchToProps = dispatch => ({
  fetchRequestedTrips: token => dispatch(fetchRequestedTrips(token)),
})

const mapStateToProps = state => ({
  user: state.user,
  requestedTrips: state.requestedTrips,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestedTrip)
