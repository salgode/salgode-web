import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPassengerTripsAction } from '../../redux/actions/passengerTrips'
import { CircularProgress } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import PassengerTripCard from '../../components/PassengerTrips/index'

class PassengerTrips extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { getPassengerTripsComponent } = this.props
    getPassengerTripsComponent()
  }
  render() {
    const { passengerTrips } = this.props
    const { tripList, loading, error } = passengerTrips
    if (error === true) {
      console.log('ha ocurrido un error')
    } else if (loading) {
      return <div>{loading && <CircularProgress />}</div>
    }
    return (
      <div>
        <Grid container spacing={2} justify="center" alignItems="center">
          {tripList.map((trip, index) => {
            return (
              <Grid item md={4} key={index}>
                <PassengerTripCard trip={trip} />
                <p key={index}>{trip['trip_id']}</p>
              </Grid>
            )
          })}
        </Grid>
      </div>
    )
  }
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
