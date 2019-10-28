import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Store
import { tripReservations } from '../../redux/actions/tripReservations'
import { TripReservationsCard } from '../../components/MyTripsCard/index'

// Components
import { CircularProgress } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'

class MyTripReservations extends Component {
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

    const response = await this.props.fetchTripReservations(
      this.props.user.token,
      'tri_12345'
    )

    if (response.error) {
      alert(
        'Error obteniendo viajes',
        'Hubo un problema obteniendo los viajes. Por favor intentalo de nuevo.'
      )
    }

    console.log(this.props.tripReservations.trips)

    this.setState({ trips: this.props.tripReservations.trips, loading: false })
  }

  render() {
    const { loading, trips } = this.state
    return (
      <div>
        {loading && <CircularProgress />}
        <Grid container spacing={2} justify="center" alignItems="center">
          {trips &&
            trips.map((trip, i) => {
              return (
                <Grid item md={4} key={i}>
                  <TripReservationsCard trip={trip} />
                </Grid>
              )
            })}
        </Grid>
      </div>
    )
  }
}

MyTripReservations.propTypes = {
  fetchTripReservations: PropTypes.func.isRequired,
  user: PropTypes.shape({
    token: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  }).isRequired,
  tripReservations: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}

const mapDispatchToProps = dispatch => ({
  fetchTripReservations: token => dispatch(tripReservations(token)),
})

const mapStateToProps = state => ({
  user: state.user,
  tripReservations: state.tripReservations,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyTripReservations)
