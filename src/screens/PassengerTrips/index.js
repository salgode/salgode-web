import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getPassengerTripsAction } from '../../redux/actions/passengerTrips'
import PassengerTripCard from '../../components/PassengerTrips/index'

import Loading from '../../components/Loading/Loading'
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

  render() {
    const { loading, trips } = this.state
    if (loading) {
      return <div>{loading && <Loading />}</div>
    }
    return (
      <div>
        <Grid container spacing={2} justify="center" alignItems="center">
          {trips.map((trip, index) => {
            return (
              <Grid item md={4} key={index}>
                <PassengerTripCard trip={trip} />
              </Grid>
            )
          })}
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
