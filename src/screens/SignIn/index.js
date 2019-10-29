import React from 'react'
import PropTypes from 'prop-types'
import './style.sass'
import routes from '../../routes.js'

// Store
import { connect } from 'react-redux'
import { loginUser } from '../../redux/actions/user'
import { setObject, USER_DATA, TOKEN } from '../../utils/storeData'

// Components
import { SignInForm } from '../../components/index'
import { CircularProgress } from '@material-ui/core'

const MESSAGE =
  'Hubo un problema iniciando sesión. Por favor intentalo de nuevo.'

class SignInScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  async onSubmit(payload) {
    const { signIn, history } = this.props

    this.setState({ loading: true })

    const user = await signIn(payload)

    if (user.error || !user.payload.data.email) return alert(MESSAGE)

    this.setState({ loading: false })
    setObject(USER_DATA, user.payload.data)
    setObject(TOKEN, user.payload.data.token)
    history.push(routes.requestTrip)
  }

  render() {
    const { loading } = this.state
    return (
      <div className="sign-in">
        <SignInForm onSubmit={this.onSubmit} />

        {loading && <CircularProgress />}
      </div>
    )
  }
}

SignInScreen.propTypes = {
  signIn: PropTypes.func.isRequired,
  history: PropTypes.object,
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispatch => ({
  signIn: payload => dispatch(loginUser(payload.email, payload.password)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInScreen)
