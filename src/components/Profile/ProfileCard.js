import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import CardHeader from '@material-ui/core/CardHeader'
import Collapse from '@material-ui/core/Collapse'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import clsx from 'clsx'
import IconButton from '@material-ui/core/IconButton'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
})

const styles = {
  media: {
    height: 10,
    paddingTop: '56.25%', // 16:9,
    marginTop: '30',
    marginBottom: '30',
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
}

class ProfileCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      expanded1: false,
      expanded2: false,
    }
  }
  handleExpandClick = () => {
    this.setState({
      expanded: !this.state.expanded,
    })
  }
  handleExpandClick2 = () => {
    this.setState({
      expanded2: !this.state.expanded2,
    })
  }
  render() {
    //const { user } = this.props
    const { classes, user } = this.props
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar
              className={classes.bigAvatar}
              src={user.selfieLink}
              style={styles}
            />
          }
          title={user.name + ' ' + user.lastName}
          subheader="Usuario"
        />
        <CardContent>
          <Typography variant="body2" component="p">
            Correo: {user.email}
            <br />
            Telefono: {user.phone}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Typography variant="h6" component="h6">
            Vehículos
          </Typography>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Grid container spacing={2}>
              {this.props.vehiculos.map((car, i) => {
                return (
                  <Grid item md={4} key={i}>
                    <Card>
                      <CardHeader
                        title={car.nickname}
                        subheader={car.type === 'car' ? 'Automóvil' : 'otro'}
                      />
                      <CardContent />
                    </Card>
                  </Grid>
                )
              })}
            </Grid>
          </CardContent>
        </Collapse>
        <CardActions disableSpacing>
          <Typography variant="h6" component="h6">
            Documentos
          </Typography>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: this.state.expanded2,
            })}
            onClick={this.handleExpandClick2}
            aria-expanded={this.state.expanded2}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded2} timeout="auto" unmountOnExit>
          <CardContent>
            <CardMedia>
              <img src={user.dniFrontLink} style={styles} />
            </CardMedia>
            <CardMedia>
              <img src={user.dniBackLink} style={styles} />
            </CardMedia>
          </CardContent>
        </Collapse>
        <CardActions>
          <Link to="/profile/edit">
            <Button size="small">Editar Perfil</Button>
          </Link>
        </CardActions>
      </Card>
    )
  }
}

ProfileCard.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  vehiculos: PropTypes.array.isRequired,
}

export default withStyles(useStyles)(ProfileCard)
