import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Store
import { fetchFutureTrips } from '../../redux/actions/trips'
import './style.sass'
import { MyTripsCard } from '../../components/MyTripsCard/index'

// Store

// Components
import { CircularProgress } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'

class MyTrips extends Component {
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
    // console.log(this.props.user.token)
    const response = await this.props.fetchFutureTrips(12345) // this.props.user.token

    if (response.error) {
      this.setState({ loading: false })
      alert(
        'Error obteniendo viajes',
        'Hubo un problema obteniendo los viajes. Por favor intentalo de nuevo.'
      )
    }

    this.setState({ trips: this.props.futureTrips.trips, loading: false })
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
  fetchFutureTrips: PropTypes.func.isRequired,
  user: PropTypes.shape({
    token: PropTypes.string,
    userId: PropTypes.string,
  }).isRequired,
  futureTrips: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}

const mapDispatchToProps = dispatch => ({
  fetchFutureTrips: token => dispatch(fetchFutureTrips(token)),
})

const mapStateToProps = state => ({
  user: state.user,
  futureTrips: state.futureTrips,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyTrips)
