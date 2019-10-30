import React from 'react'
import PropTypes from 'prop-types'
import './style.sass'
import routes from '../../routes.js'
import { setObject, USER_DATA, TOKEN } from '../../utils/storeData'

// Store
import { connect } from 'react-redux'
import { signupUser } from '../../redux/actions/user'

// Components
import { SignUpForm } from '../../components/index'
import Loading from '../../components/Loading/Loading'

const MESSAGE = 'Hubo un problema registrandote. Por favor intentalo de nuevo.'

class SignUpScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  async onSubmit(payload) {
    const { signUp, history } = this.props

    this.setState({ loading: true })

    const user = await signUp(payload)

    this.setState({ loading: false })

    if (user.error || !user.payload.data.email || !user.payload.data.user_id) {
      this.setState({ loading: false })
      return alert(MESSAGE)
    }

    setObject(USER_DATA, user.payload.data)
    setObject(TOKEN, user.payload.data.token)
    history.push(routes.requestTrip)
  }

  render() {
    const { loading } = this.state

    return (
      <div className="sign-up">
        <SignUpForm onSubmit={this.onSubmit} />

        {loading && <Loading />}
      </div>
    )
  }
}

SignUpScreen.propTypes = {
  signUp: PropTypes.func.isRequired,
  history: PropTypes.object,
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispatch => ({
  signUp: payload =>
    dispatch(
      signupUser(
        payload.name,
        payload.lastName,
        payload.email,
        payload.phone,
        payload.password,
        payload.passwordRepeat
      )
    ),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpScreen)
