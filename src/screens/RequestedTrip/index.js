import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { fetchFutureTrips } from '../../redux/actions/trips'
import { RequestedTripCard } from '../../components/MyTripsCard/index'
import { ParseDate, ParseHour } from '../../components/Parse/index'

// Store

// Components
import { CircularProgress } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
// const MESSAGE = 'Hubo un problema registrandote. Por favor intentalo de nuevo.'

class RequestedTrip extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      trips: [],
    }
    this.getTrips = this.getTrips.bind(this)
    this.getTrips2 = this.getTrips2.bind(this)
  }

  componentDidMount() {
    this.getTrips(1234)
    // this.getTrips2()
  }

  async fetchTrips(token) {
    // eslint-disable-next-line no-console
    console.log(token)
    // fetch from server
    return [
      {
        timestamp: 1571590002,
        spacesUsed: 3,
        tripId: '0',
        start: 'Campus San Joaquin',
        end: 'Manquehue',
        user: {
          name: 'Benjamin',
          reputation: 17,
        },
        status: 'Aceptado',
      },
      {
        timestamp: 1571503602,
        spacesUsed: 3,
        tripId: '1',
        start: 'Campus San Joaquin',
        end: 'Manquehue',
        user: {
          name: 'Benjamin',
          reputation: 17,
        },
        status: 'Pendiente',
      },
      {
        timestamp: 1571586402,
        spacesUsed: 3,
        tripId: '2',
        start: 'Campus San Joaquin',
        end: 'Manquehue',
        user: {
          name: 'Benjamin',
          reputation: 17,
        },
        status: 'Rechazado',
      },
      {
        timestamp: 1570985202,
        spacesUsed: 3,
        tripId: '3',
        start: 'Campus San Joaquin',
        end: 'Manquehue',
        user: {
          name: 'Benjamin',
          reputation: 17,
        },
        status: 'Aceptado',
      },
      {
        timestamp: 1571593602,
        spacesUsed: 3,
        tripId: '4',
        start: 'Puente Alto',
        end: 'Tobalaba',
        user: {
          name: 'Benjamin',
          reputation: 17,
        },
        status: 'Aceptado',
      },
      {
        timestamp: 1571676402,
        spacesUsed: 3,
        tripId: '5',
        start: 'Tobalaba',
        end: 'Puente Alto',
        user: {
          name: 'Benjamin',
          reputation: 17,
        },
        status: 'Aceptado',
      },
    ]
  }

  async getTrips(token) {
    this.setState({ loading: true })

    const etd = '2019-10-23T05:40:00.000Z'
    console.log(ParseDate(etd))
    console.log(ParseHour(etd))

    await this.fetchTrips(token)
      .then(trips => this.setState({ trips }))
      .catch(err => {
        this.setState({ loading: false })
        alert('Hubo un error, intenta de nuevo más tarde', err)
      })

    this.setState({ loading: false })
  }

  async getTrips2() {
    const response = await this.props.fetchFutureTrips(12345) // this.props.user.token

    if (response.error) {
      alert(
        'Error obteniendo viajes',
        'Hubo un problema obteniendo los viajes. Por favor intentalo de nuevo.'
      )
    }

    this.setState({ trips: this.props.trips })
  }

  render() {
    const { loading, trips } = this.state
    return (
      <div>
        {loading && <CircularProgress />}
        <Grid container spacing={2} justify="center" alignItems="center">
          {trips.map((trip, i) => {
            // Return the element. Also pass key
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
  isRequestedTrips: PropTypes.bool,
  fetchFutureTrips: PropTypes.func.isRequired,
  user: PropTypes.shape({
    token: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  }).isRequired,
  trips: PropTypes.array,
}

RequestedTrip.defaultProps = {
  isRequestedTrips: false,
}

const mapDispatchToProps = dispatch => ({
  fetchFutureTrips: token => dispatch(fetchFutureTrips(token)),
})

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestedTrip)