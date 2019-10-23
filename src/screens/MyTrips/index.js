import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './style.sass'
import MyTripsCard from '../../components/MyTripsCard/index'

// Store

// Components
// import { SignUpForm } from '../../components/index'
// import { CircularProgress } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
// const MESSAGE = 'Hubo un problema registrandote. Por favor intentalo de nuevo.'

class MyTrips extends Component {
  static navigationOptions = {
    title: 'Mis Viajes',
  }

  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      trips: [],
    }
    this.getTrips = this.getTrips.bind(this)
  }

  onPressTrip(asDriver) {
    this.props.navigation.navigate('DetailedTrip', { asDriver })
  }

  componentDidMount() {
    this.getTrips(123)
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
        status: 'accepted',
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
        status: 'pending',
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
        status: 'rejected',
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
        status: 'accepted',
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
        status: 'accepted',
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
        status: 'accepted',
      },
    ]
  }

  async getTrips(token) {
    this.setState({ loading: true })

    await this.fetchTrips(token)
      .then(trips => this.setState({ trips }))
      .catch(err => {
        this.setState({ loading: false })
        alert('Hubo un error, intenta de nuevo más tarde', err)
      })

    this.setState({ loading: false })
  }

  render() {
    // const { loading } = this.state
    const { trips } = this.state
    console.log(this.state.trips)
    return (
      // <div className="sign-up">{loading && <CircularProgress />}</div>
      <div>
        <Grid container spacing={2} justify="center" alignItems="center">
          {trips.map((trip, i) => {
            console.log(trip)
            console.log(trip.spacesUsed)
            console.log('Entered')
            // Return the element. Also pass key
            return (
              <Grid item md={4} key={i}>
                <MyTripsCard trip={trip} />
              </Grid>
            )
          })}
        </Grid>
      </div>
    )
  }
}

MyTrips.propTypes = {
  isRequestedTrips: PropTypes.bool,
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired })
    .isRequired,
}

MyTrips.defaultProps = {
  isRequestedTrips: false,
}

export default MyTrips
