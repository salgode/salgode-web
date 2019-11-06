import React from 'react'
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles({
  container: {
    height: 'calc(100vh - 3px)',
    padding: 0,
  },
  dim: {
    left: 0,
    width: '100%',
    height: '102%',
    position: 'fixed',
    top: 56,
    zIndex: -1,
  },
  circularProgress: {
    position: 'relative',
    top: -28,
  },
  emptyStateImage: {
    width: 79,
    height: 79,
    opacity: 0.4,
  },
  emptyStateText: {
    fontSize: 15,
    color: 'gray',
    marginTop: 20,
    textAlign: 'center',
  },
})

const EmptyState = props => {
  const { text } = props
  const classes = useStyles()

  return (
    <Container className={classes.dim}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        align="center"
        className={classes.container}
      >
        <Grid item>
          <img src="notrips.png" className={classes.emptyStateImage} />
          <Typography className={classes.emptyStateText}>{text}</Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

EmptyState.propTypes = {
  text: PropTypes.string.isRequired,
}

export default EmptyState
