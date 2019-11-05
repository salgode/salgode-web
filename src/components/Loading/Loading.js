import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'

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
    backgroundColor: fade('#ffffff', 0.5),
    zIndex: 1000,
    top: 56,
  },
  circularProgress: {
    position: 'relative',
    top: -28,
  },
})

const Loading = () => {
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
          <CircularProgress className={classes.circularProgress} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Loading
