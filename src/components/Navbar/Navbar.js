import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import './Navbar.sass'
import { resetStorage } from '../../utils/storeData'
import routes from '../../routes.js'
import { logoutUser } from '../../redux/actions/user'

import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Collapse from '@material-ui/core/Collapse'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Fab from '@material-ui/core/Fab'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Zoom from '@material-ui/core/Zoom'
import InputIcon from '@material-ui/icons/Input'

import { makeStyles } from '@material-ui/core/styles'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCarAlt,
  faPlusCircle,
  faUser,
  faWalking,
} from '@fortawesome/free-solid-svg-icons'
import { faAddressBook, faListAlt } from '@fortawesome/free-regular-svg-icons'

import { Link } from 'react-router-dom'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    color: '#0000ff',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  appName: {
    flexGrow: 1,
    fontFamily: 'Kepler296',
    color: 'white',
    textAlign: 'center',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  hide: {
    display: 'none',
  },
  menuButton: {
    marginLeft: theme.spacing(2),
  },
  navbarOffset: {
    width: theme.spacing(6),
  },
}))

function ElevationScroll(props) {
  const { children, window } = props
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  })

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  })
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
}

function ScrollTop(props) {
  const { children, window } = props
  const classes = useStyles()
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  })

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor'
    )

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  )
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
}

function DrawerRender(open, setOpen, close, logout) {
  const classes = useStyles()
  const [openDrop, setOpenDrop] = React.useState(false)
  const [openDropPass, setOpenDropPass] = React.useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const handleDrawerClose = () => {
    open && !close ? (close = true) : setOpen(false)
  }

  const handleClick = () => {
    setOpenDrop(!openDrop)
  }

  const handleClick2 = () => {
    setOpenDropPass(!openDropPass)
  }

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index)
  }

  return (
    <ClickAwayListener onClickAway={handleDrawerClose}>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronRightIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            button
            selected={selectedIndex === 0}
            onClick={event => handleListItemClick(event, 0)}
            component={Link}
            to={routes.requestTrip}
          >
            <ListItemIcon>
              <FontAwesomeIcon icon={faUser} style={{ fontSize: 'medium' }} />
            </ListItemIcon>
            <ListItemText primary="Pedir Viaje" />
          </ListItem>
          <ListItem button onClick={handleClick2}>
            <ListItemIcon>
              <FontAwesomeIcon icon={faWalking} size="lg" />
            </ListItemIcon>
            <ListItemText primary="Pasajero" />
            {openDropPass ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openDropPass} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                component={Link}
                to={routes.requestedTrip}
                className={classes.nested}
                selected={selectedIndex === 1}
                onClick={event => handleListItemClick(event, 1)}
              >
                <ListItemIcon>
                  <FontAwesomeIcon
                    icon={faListAlt}
                    style={{ fontSize: 'medium' }}
                  />
                </ListItemIcon>
                <ListItemText primary="Estado Reservas" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to={routes.passengerTrips}
                className={classes.nested}
                selected={selectedIndex === 2}
                onClick={event => handleListItemClick(event, 2)}
              >
                <ListItemIcon>
                  <FontAwesomeIcon icon={faCarAlt} size="lg" />
                </ListItemIcon>
                <ListItemText primary="Mis Viajes" />
              </ListItem>
            </List>
          </Collapse>
          <Divider />
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <FontAwesomeIcon icon={faCarAlt} size="lg" />
            </ListItemIcon>
            <ListItemText primary="Conductor" />
            {openDrop ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openDrop} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                component={Link}
                to={routes.createTrip}
                className={classes.nested}
                selected={selectedIndex === 2}
                onClick={event => handleListItemClick(event, 2)}
              >
                <ListItemIcon>
                  <FontAwesomeIcon
                    icon={faPlusCircle}
                    style={{ fontSize: 'medium' }}
                  />
                </ListItemIcon>
                <ListItemText primary="Crear Viaje" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to={routes.myTrips}
                className={classes.nested}
                selected={selectedIndex === 3}
                onClick={event => handleListItemClick(event, 3)}
              >
                <ListItemIcon>
                  <FontAwesomeIcon icon={faCarAlt} size="lg" />
                </ListItemIcon>
                <ListItemText primary="Mis Viajes" />
              </ListItem>
            </List>
          </Collapse>
          <Divider />
          <ListItem
            button
            component={Link}
            to={routes.profile}
            selected={selectedIndex === 4}
            onClick={event => handleListItemClick(event, 4)}
          >
            <ListItemIcon>
              <FontAwesomeIcon icon={faAddressBook} size="lg" />
            </ListItemIcon>
            <ListItemText primary="Mi Perfil" />
          </ListItem>
          <Divider />
          <ListItem
            button
            component={Link}
            to={routes.signIn}
            onClick={() => logout()}
          >
            <ListItemIcon>
              <InputIcon />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItem>
        </List>
      </Drawer>
    </ClickAwayListener>
  )
}

function Navbar(props) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const close = false

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <Box className={classes.navbarOffset} />
            <Link to={routes.requestTrip} className={classes.appName}>
              <Typography variant="h5" className={classes.appName}>
                SalgoDe
              </Typography>
            </Link>
            <IconButton
              edge="end"
              className={clsx(classes.menuButton, open && classes.hide)}
              onClick={handleDrawerOpen}
              color="inherit"
              aria-label="menu"
              style={{ display: props.display }}
            >
              <MenuIcon className="icon-color" />
            </IconButton>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar id="back-to-top-anchor" />
      {DrawerRender(open, setOpen, close, props.logoutHandler)}
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  )
}

export class NavbarWrapper extends Component {
  constructor(props) {
    super(props)
    this.logoutHandler = this.logoutHandler.bind(this)
  }
  logoutHandler() {
    this.props.logoutUser()
    resetStorage()
  }

  render() {
    const { user } = this.props
    const display = user.token ? 'block' : 'none'
    return <Navbar logoutHandler={this.logoutHandler} display={display} />
  }
}
NavbarWrapper.propTypes = {
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
}

Navbar.propTypes = {
  display: PropTypes.string.isRequired,
  logoutHandler: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = {
  logoutUser: logoutUser,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarWrapper)
