import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getPassengerTripsAction } from '../../redux/actions/passengerTrips'
import PassengerTripCard from '../../components/PassengerTrips/index'

import { CircularProgress } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'

class PassengerTrips extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }
  componentDidMount() {
    this.getPassengerTrips()
  }

  async getPassengerTrips() {
    this.setState({ loading: true })
    const { getPassengerTripsComponent } = this.props
    await getPassengerTripsComponent()
    const { passengerTrips } = this.props
    const { error } = passengerTrips

    if (error) {
      this.setState({ loading: false })
      alert(
        'Error obteniendo viajes',
        'Hubo un problema obteniendo los viajes. Por favor intentalo de nuevo.'
      )
    }

    this.setState({ loading: false })
  }

  render() {
    const { passengerTrips } = this.props
    const { loading } = this.state
    const { tripList } = passengerTrips
    if (loading) {
      return <div>{loading && <CircularProgress />}</div>
    }
    return (
      <div>
        <Grid container spacing={2} justify="center" alignItems="center">
          {tripList.map((trip, index) => {
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
}

const mapDispatchToProps = dispatch => ({
  getPassengerTripsComponent: () => dispatch(getPassengerTripsAction()),
})

const mapStateToProps = state => {
  const { passengerTrips } = state
  return {
    passengerTrips,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PassengerTrips)
