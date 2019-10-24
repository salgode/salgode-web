import React from 'react'
import { connect } from 'react-redux'

import './style.sass'

const Home = props => <div className="home">{JSON.stringify(props.user)}</div>

const mapStateToProps = state => {
  const { user } = state
  return {
    user,
  }
}

export default connect(mapStateToProps)(Home)
