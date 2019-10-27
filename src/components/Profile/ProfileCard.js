import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Collapse from '@material-ui/core/Collapse'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

/*
const useStyles = makeStyles({
	card: {
		minWidth: 275
	},
	bigAvatar: {
		margin: 10,
		width: 60,
		height: 60
	}
});
*/

class ProfileCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      expanded1: false,
      expanded2: false,
    }
  }

  handleExpandClick = (name, expanded) => {
    this.setState({ [name]: !expanded })
  }

  render() {
    const { user } = this.props
    const { expanded1, expanded2 } = this.state
    return (
      <Card className="card">
        <CardHeader
          avatar={<Avatar className="bigAvatar" src={user.selfieLink} />}
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
            onClick={() => this.handleExpandClick('expanded1', expanded1)}
            aria-expanded={expanded1}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded1} timeout="auto" unmountOnExit>
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
            onClick={() => this.handleExpandClick('expanded2', expanded2)}
            aria-expanded={expanded2}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded2} timeout="auto" unmountOnExit>
          <CardContent>
            <CardMedia>
              <img src={user.dniFrontLink} />
            </CardMedia>
            <CardMedia>
              <img src={user.dniBackLink} />
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
  user: PropTypes.object.isRequired,
  vehiculos: PropTypes.array.isRequired,
}

export default ProfileCard
