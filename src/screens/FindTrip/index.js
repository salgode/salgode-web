import React from 'react'
// import PropTypes from 'prop-types'

import './style.sass'
import { Container } from '@material-ui/core'

import FindTripsCard from './../../components/FindTripsCard/index'
// Store
// import { connect } from 'react-redux'

// Components
// import { CircularProgress } from '@material-ui/core'

// const MESSAGE =
// 'Hubo un problema iniciandso sesión. Por favor intentalo de nuevo.'

const trips = [
  {
    driver: 'Martin Anselmo',
    trip_status: 'open',
    created_at: '2019-10-22T16:41:55-04:00',
    trip_id: 'tri_112b05c8-0973-4160-a40b-f0d588ec2503',
    etd: '2019-10-22T17:10:00.000Z',
    trip_route_points: [
      {
        city: 'SANTIAGO',
        commune: 'PROVIDENCIA',
        address: 'San Pío X 5255, Vitacura, Providencia, Región Metropolitana',
        id: 'spt_d1cd6d79-6fad-4b37-9f87-48e169c9d530',
        name: 'Centro comercial Plaza San Pío, Vitacura 5255',
        type: ['shopping_mall', 'point_of_interest', 'establishment'],
      },
      {
        city: 'SANTIAGO',
        commune: 'MAIPU',
        address: 'Avda. Pajaritos 5090',
        id: 'spt_d5eb212a-ab53-4f0e-9e49-15f288ee2cbf',
        name: 'LAS PARCELAS',
        type: ['subway_station'],
      },
    ],
  },
  {
    driver: 'Martin Anselmo',
    trip_status: 'open',
    created_at: '2019-10-22T16:41:55-04:00',
    trip_id: 'tri_112b05c8-0973-4160-a40b-f0d588ec2503',
    etd: '2019-10-22T17:10:00.000Z',
    trip_route_points: [
      {
        city: 'SANTIAGO',
        commune: 'PROVIDENCIA',
        address: 'San Pío X 5255, Vitacura, Providencia, Región Metropolitana',
        id: 'spt_d1cd6d79-6fad-4b37-9f87-48e169c9d530',
        name: 'Centro comercial Plaza San Pío, Vitacura 5255',
        type: ['shopping_mall', 'point_of_interest', 'establishment'],
      },
      {
        city: 'SANTIAGO',
        commune: 'MAIPU',
        address: 'Avda. Pajaritos 5090',
        id: 'spt_d5eb212a-ab53-4f0e-9e49-15f288ee2cbf',
        name: 'LAS PARCELAS',
        type: ['subway_station'],
      },
    ],
  },
]

class FindTripScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }

  render() {
    return (
      <div className="find-trip">
        <Container>
          {trips.map((trip, i) => (
            <FindTripsCard trip={trip} key={i} />
          ))}
        </Container>
      </div>
    )
  }
}

export default FindTripScreen

// FindTripScreen.propTypes = {
//     signIn: PropTypes.func.isRequired,
// }

// const mapStateToProps = state => ({
//     user: state.user,
// })

// const mapDispatchToProps = dispatch => ({
//     signIn: payload => dispatch(loginUser(payload.email, payload.password)),
// })

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(SignInScreen)
