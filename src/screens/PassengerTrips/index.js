import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getPassengerTripsAction } from '../../redux/actions/passengerTrips'
import PassengerTripCard from '../../components/PassengerTrips/index'
import EmptyState from '../../components/EmptyState/index'
import Loading from '../../components/Loading/Loading'
import SimpleBreadcrumbs from '../../components/Breadcrumbs/index'

import Grid from '@material-ui/core/Grid'

class PassengerTrips extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      trips: [],
    }
  }
  componentDidMount() {
    this.getPassengerTrips()
  }

  async getPassengerTrips() {
    this.setState({ loading: true })
    const { getPassengerTripsComponent, user } = this.props
    const response = await getPassengerTripsComponent(user.token)

    if (response.error) {
      this.setState({ loading: false })
      alert(
        'Error obteniendo viajes',
        'Hubo un problema obteniendo los viajes. Por favor intentalo de nuevo.'
      )
    }

    this.setState({ trips: this.props.passengerTrips.tripList, loading: false })
  }

  renderTrips(trips) {
    if (trips && trips.length > 0) {
      return trips.map((trip, i) => {
        return (
          <Grid item md={4} key={i}>
            <PassengerTripCard trip={trip} />
          </Grid>
        )
      })
    } else {
      return <EmptyState text="No tienes viajes hasta ahora" />
    }
  }

  render() {
    const { loading, trips } = this.state
    if (loading) return <Loading />

    const breadcrumb = {
      Pasajero: '/',
      'Mis Viajes': '/',
    }
    return (
      <div>
        <SimpleBreadcrumbs antecesors={breadcrumb} />
        <Grid container spacing={2} justify="center">
          {this.renderTrips(trips)}
        </Grid>
      </div>
    )
  }
}

PassengerTrips.propTypes = {
  passengerTrips: PropTypes.object.isRequired,
  getPassengerTripsComponent: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

const mapDispatchToProps = dispatch => ({
  getPassengerTripsComponent: token => dispatch(getPassengerTripsAction(token)),
})

const mapStateToProps = state => ({
  user: state.user,
  passengerTrips: state.passengerTrips,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PassengerTrips)
