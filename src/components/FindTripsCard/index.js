import React from 'react'
// import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import { red } from '@material-ui/core/colors'
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

const styles = theme => ({
  card: {
    marginRight: '10%',
    marginLeft: '10%',
    marginTop: '20px',
  },
  [theme.breakpoints.down('sm')]: {
    card: {
      marginRight: '3%',
      marginLeft: '3%',
    },
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  departure: {
    color: 'blue',
    transform: 'scale(0.9)',
  },
  arrival: {
    color: 'green',
    transform: 'scale(0.9)',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
})

class FindTripsCard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      expanded: false,
    }
  }

  handleExpandClick = () => {
    const { expanded } = this.state
    this.setState({ expanded: !expanded })
  }

  render() {
    const { trip_route_points, driver, etd } = this.props.trip
    const { expanded } = this.state
    const { classes } = this.props

    const departurePoint = trip_route_points[0]
    const arrivalPoint = trip_route_points[trip_route_points.length - 1]

    console.log(trip_route_points, driver, etd)

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={driver}
        />
        <CardContent>
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <Icon className={classes.departure}>check_circle</Icon>
            </Grid>
            <Grid item>
              <Typography variant="body2" component="h4">
                {departurePoint.address}
                {departurePoint.commune}
                {departurePoint.city}
              </Typography>
            </Grid>
          </Grid>

          <Grid container direction="row" alignItems="center">
            <Grid item>
              <Icon className={classes.arrival}>check_circle</Icon>
            </Grid>
            <Grid item>
              <Typography variant="body2" component="h4">
                {arrivalPoint.address}
                {arrivalPoint.commune}
                {arrivalPoint.city}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography
                    gutterBottom
                    variant="body2"
                    color="textSecondary"
                  >
                    Fecha
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body2"
                    color="textSecondary"
                  >
                    Hora
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  className={classes.button}
                  color="primary"
                  onClick={this.handleExpandClick}
                >
                  Solicitar viaje
                </Button>
                {/* <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={this.handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton> */}
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
          </CardContent>
        </Collapse>
      </Card>
    )
  }
}

export default withStyles(styles)(FindTripsCard)
