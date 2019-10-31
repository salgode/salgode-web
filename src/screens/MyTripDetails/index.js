import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Store
import { tripReservations } from '../../redux/actions/tripReservations'
import { requestedTripsDetails } from '../../redux/actions/tripDetails'
import { tripManifest } from '../../redux/actions/tripManifest'
// import Container from '@material-ui/core/Container'
import { TripReservationsCard } from '../../components/MyTripsCard/index'
import { TripDetailsCard } from '../../components/MyTripsCard/index'
import { TripManifestCard } from '../../components/MyTripsCard/index'

// Components
import Loading from '../../components/Loading/Loading'
import './style.css'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

class MyTripDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      reservations: [],
      trip: [],
      manifest: [],
    }
    this.getReservations = this.getReservations.bind(this)
    this.getTripDetail = this.getTripDetail.bind(this)
    this.getTripManifest = this.getTripManifest.bind(this)
  }

  componentDidMount() {
    this.setState({ loading: true })
    this.getTripDetail()
    this.getReservations()
    this.getTripManifest()
    this.setState({ loading: false })
  }

  async getReservations() {
    const { match } = this.props
    const response = await this.props.fetchTripReservations(
      this.props.user.token,
      match.params.id
    )

    if (response.error) {
      alert(
        'Error obteniendo viajes',
        'Hubo un problema obteniendo los viajes. Por favor intentalo de nuevo.'
      )
    }
    this.setState({
      reservations: this.props.tripReservations.trips,
    })
  }

  async getTripDetail() {
    this.setState({ loading: true })
    const { fetchdetailsTrip, match } = this.props

    const reserve = await fetchdetailsTrip(
      this.props.user.token,
      match.params.id
    )

    if (reserve.error) {
      this.setState({ loading: false })
      return alert(
        'Error obteniendo el detalle',
        'Hubo un problema obteniendo el detalle del viaje. Por favor intentalo de nuevo.'
      )
    }
    this.setState({ trip: reserve.payload.data })
  }

  async getTripManifest() {
    this.setState({ loading: true })
    const { fetchtripManifest, match } = this.props

    const reserve = await fetchtripManifest(
      this.props.user.token,
      match.params.id
    )

    if (reserve.error) {
      this.setState({ loading: false })
      return alert(
        'Error obteniendo el detalle',
        'Hubo un problema obteniendo el detalle del viaje. Por favor intentalo de nuevo.'
      )
    }
    this.setState({ manifest: reserve.payload.data, loading: false })
  }

  renderDetails() {
    const { trip } = this.state
    if (Object.keys(trip).length > 0) return <TripDetailsCard trip={trip} />
  }

  renderReservations(reservations) {
    if (reservations) {
      return reservations.map((reservation, i) => {
        return (
          <Grid item md={4} key={i}>
            <TripReservationsCard trip={reservation} />
          </Grid>
        )
      })
    }
  }

  renderPassengers() {
    const { manifest } = this.state
    if (Object.keys(manifest).length > 0) {
      return manifest.passengers.map((passenger, i) => {
        return (
          <Grid item md={4} key={i}>
            <TripManifestCard trip={passenger} />
          </Grid>
        )
      })
    }
  }

  render() {
    const { loading, reservations } = this.state
    if (loading) return <Loading />
    return (
      <div className="card-container">
        <div>{this.renderDetails()}</div>
        <div className="cards">
          <Grid container spacing={2} justify="center">
            <Grid item md={4}>
              <Typography variant="h6" component="h2" align="center">
                Pasajeros
              </Typography>
              {this.renderPassengers()}
            </Grid>
            <Grid item md={4}>
              <Typography variant="h6" component="h2" align="center">
                Solicitudes
              </Typography>
              {this.renderReservations(reservations)}
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

MyTripDetails.propTypes = {
  fetchTripReservations: PropTypes.func.isRequired,
  fetchdetailsTrip: PropTypes.func.isRequired,
  fetchtripManifest: PropTypes.func.isRequired,
  user: PropTypes.shape({
    token: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  }).isRequired,
  tripReservations: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  tripDetails: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  match: PropTypes.object.isRequired,
}

const mapDispatchToProps = dispatch => ({
  fetchTripReservations: token => dispatch(tripReservations(token)),
  fetchdetailsTrip: (token, id) => dispatch(requestedTripsDetails(token, id)),
  fetchtripManifest: (token, id) => dispatch(tripManifest(token, id)),
})

const mapStateToProps = state => ({
  user: state.user,
  tripReservations: state.tripReservations,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyTripDetails)
