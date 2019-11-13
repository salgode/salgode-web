import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import routes from '../../routes.js'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Collapse from '@material-ui/core/Collapse'
import Container from '@material-ui/core/Container'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import MailIcon from '@material-ui/icons/Mail'
import PhoneIcon from '@material-ui/icons/Phone'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  alignIcon: {
    alignItems: 'center',
    display: 'flex',
    '& p': {
      marginLeft: '8px',
    },
  },
  bigAvatar: {
    margin: 10,
    width: 100,
    height: 100,
  },
  cardActions: {
    justifyContent: 'center',
  },
  cardContent: {
    padding: '0 32px 0',
  },
  expandMenu: {
    padding: '0 16px 0',
  },
  profileHeader: {
    '& div': {
      flex: 'inherit',
    },
    justifyContent: 'center',
  },
})

class ProfileCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      expanded1: true,
      expanded2: false,
      expanded3: false,
    }
  }

  handleExpandClick = (name, expanded) => {
    this.setState({ [name]: !expanded })
  }

  renderCars() {
    const { user } = this.props
    const vehiculos = user.vehicles
    if (vehiculos && vehiculos.length > 0) {
      return vehiculos.map((car, i) => {
        return (
          <Grid item md={4} key={i}>
            <Card>
              <CardHeader
                title={car.alias}
                subheader={
                  car.vehicle_attributes.type === 'car' ? 'Automóvil' : 'otro'
                }
              />
              <CardContent />
            </Card>
          </Grid>
        )
      })
    } else {
      return (
        <Typography variant="body2" component="p">
          No has agregado ningún vehículo
        </Typography>
      )
    }
  }

  render() {
    const { user, classes } = this.props
    const { expanded1, expanded2, expanded3 } = this.state
    return (
      <Card className={classes.mainCard}>
        <CardHeader
          avatar={
            <Avatar className={classes.bigAvatar} src={user.selfieLink} />
          }
          title={user.name + ' ' + user.lastName}
          subheader="Usuario"
          className={classes.profileHeader}
        />
        <CardActions disableSpacing className={classes.expandMenu}>
          <Typography variant="h6" component="h6">
            Información personal
          </Typography>
          <IconButton
            onClick={() => this.handleExpandClick('expanded1', expanded1)}
            aria-expanded={expanded1}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded1} timeout="auto" unmountOnExit>
          <CardContent className={classes.cardContent}>
            <Container className={classes.alignIcon}>
              <MailIcon color="primary" />
              <Typography variant="body2" component="p">
                {user.email}
              </Typography>
            </Container>
            <Container className={classes.alignIcon}>
              <PhoneIcon color="primary" />
              <Typography variant="body2" component="p">
                {user.phone}
              </Typography>
            </Container>
          </CardContent>
        </Collapse>

        <CardActions disableSpacing className={classes.expandMenu}>
          <Typography variant="h6" component="h6">
            Vehículos
          </Typography>
          <IconButton
            onClick={() => this.handleExpandClick('expanded2', expanded2)}
            aria-expanded={expanded2}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded2} timeout="auto" unmountOnExit>
          <CardContent className={classes.cardContent}>
            <Grid container spacing={2}>
              {this.renderCars()}
            </Grid>
          </CardContent>
        </Collapse>
        <CardActions disableSpacing className={classes.expandMenu}>
          <Typography variant="h6" component="h6">
            Documentos
          </Typography>
          <IconButton
            onClick={() => this.handleExpandClick('expanded3', expanded3)}
            aria-expanded={expanded3}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded3} timeout="auto" unmountOnExit>
          <CardContent className={classes.cardContent}>
            <CardMedia>
              <img src={user.dniFrontLink} />
            </CardMedia>
            <CardMedia>
              <img src={user.dniBackLink} />
            </CardMedia>
            <CardMedia>
              <img src={user.driFrontLink} />
            </CardMedia>
            <CardMedia>
              <img src={user.driBackLink} />
            </CardMedia>
          </CardContent>
        </Collapse>
        <CardActions className={classes.cardActions}>
          <Button
            component={Link}
            variant="contained"
            color="secondary"
            to={routes.updateUser}
          >
            Editar Perfil
          </Button>
        </CardActions>
      </Card>
    )
  }
}

ProfileCard.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ProfileCard)
