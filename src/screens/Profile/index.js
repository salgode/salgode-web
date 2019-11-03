import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './style.sass'
import ProfileCard from '../../components/Profile/ProfileCard.js'

export class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
    }
  }

  render() {
    const { loading } = this.state
    if (!loading) {
      return (
        <div>
          <div>
            <br />
            <ProfileCard user={this.props.user} />
          </div>
        </div>
      )
    } else {
      return <div> Loading...</div>
    }
  }
}

Profile.propTypes = {
  user: PropTypes.shape({
    token: PropTypes.string,
    userId: PropTypes.string,
  }).isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(Profile)
