import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

// Store
import { fetchFutureTrips } from '../../redux/actions/trips'
import './style.sass'
import { MyTripsCard } from '../../components/MyTripsCard/index'
import EmptyState from '../../components/EmptyState/index'
import SimpleBreadcrumbs from '../../components/Breadcrumbs/index'

// Components
import Loading from '../../components/Loading/Loading'
import Grid from '@material-ui/core/Grid'
import routes from '../../routes'

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
    if (!this.checkIsDriver()) {
      this.getTrips()
    }
  }

  async getTrips() {
    this.setState({ loading: true })
    const response = await this.props.fetchFutureTrips(this.props.user.token)

    if (response.error) {
      this.setState({ loading: false })
      alert(
        'Error obteniendo viajes',
        'Hubo un problema obteniendo los viajes. Por favor intentalo de nuevo.'
      )
    }

    this.setState({ trips: this.props.futureTrips.trips, loading: false })
  }

  renderTrips(trips) {
    if (trips && trips.length > 0) {
      return trips.map((trip, i) => {
        return (
          <Grid item md={4} xs={12} sm={5} key={i}>
            <MyTripsCard trip={trip} />
          </Grid>
        )
      })
    } else {
      return <EmptyState text="No has creado ningun viaje" />
    }
  }

  checkIsDriver() {
    const { user } = this.props
    if (
      user.vehicles.length === 0 ||
      user.driFrontLink === null ||
      user.driBackLink === null
    ) {
      return true
    }
    return false
  }

  render() {
    const { loading, trips } = this.state
    if (loading) return <Loading />
    const breadcrumb = {
      Conductor: '/',
      'Mis Viajes': '/',
    }

    if (this.checkIsDriver()) {
      alert(
        'Solo para conductores\nAsegurate de tener tu licencia de conducir y algún vehiculo registrado'
      )
      return <Redirect to={routes.profile} />
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

MyTrips.propTypes = {
  fetchFutureTrips: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
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
