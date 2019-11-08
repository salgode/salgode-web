import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './style.sass'
import routes from '../../routes.js'
import { getObject, setObject, USER_DATA, TOKEN } from '../../utils/storeData'

// Store
import { connect } from 'react-redux'
import { signupUser } from '../../redux/actions/user'

// Components
import { SignUpForm } from '../../components/index'
import Loading from '../../components/Loading/Loading'
import { Redirect } from 'react-router-dom'

const MESSAGE = 'Hubo un problema registrandote. Por favor intentalo de nuevo.'

class SignUpScreen extends Component {
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
    } else {
      alert(
        '¡Registro exitoso! Se te envío un correo electrónico para que confirmes tu cuenta. Necesitarás confirmar tu correo antes de iniciar sesión'
      )
    }

    setObject(USER_DATA, user.payload.data)
    setObject(TOKEN, user.payload.data.token)
    history.push(routes.requestTrip)
  }

  render() {
    const { loading } = this.state
    if (getObject(USER_DATA) && getObject(USER_DATA).token != null) {
      return <Redirect to={routes.requestTrip} />
    }
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
        payload.passwordRepeat,
        payload.selfieLink,
        payload.dniFrontLink,
        payload.dniBackLink
      )
    ),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpScreen)
