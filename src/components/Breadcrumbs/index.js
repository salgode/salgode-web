import React, { Component } from 'react'
import PropTypes from 'prop-types'
import routes from '../../routes.js'

import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  root: {
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 5,
  },
})

class SimpleBreadcrumbs extends Component {
  renderAntecesors(antecesors) {
    if (Object.keys(antecesors).length > 0) {
      return (
        <Breadcrumbs aria-label="breadcrumb">
          {Object.keys(antecesors).map((k_antecesor, index) => {
            if (antecesors[k_antecesor] === '/') {
              return (
                <Typography
                  color={index === 0 ? 'inherit' : 'textPrimary'}
                  key={index}
                >
                  {k_antecesor}
                </Typography>
              )
            }
            return (
              <Link
                color="inherit"
                href={routes[antecesors[k_antecesor]]}
                key={index}
              >
                {k_antecesor}
              </Link>
            )
          })}
        </Breadcrumbs>
      )
    }
  }

  render() {
    const { classes, antecesors } = this.props

    return (
      <div className={classes.root}>{this.renderAntecesors(antecesors)}</div>
    )
  }
}

SimpleBreadcrumbs.propTypes = {
  classes: PropTypes.object.isRequired,
  antecesors: PropTypes.object.isRequired,
}

export default withStyles(styles)(SimpleBreadcrumbs)
