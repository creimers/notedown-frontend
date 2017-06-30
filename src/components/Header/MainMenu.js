import React from 'react'
import PropTypes from 'prop-types'

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import FontIcon from 'material-ui/FontIcon'
import MenuItem from 'material-ui/MenuItem'
import { withRouter } from 'react-router-dom'


class MainMenu extends React.Component {
  goToRoute = (route) => {
    this.props.history.push(route)
    if (!this.props.docked) {
      this.props.onRequestChange()
    }
  }
  render() {
    return (
      <Drawer
        open={this.props.open}
        docked={this.props.docked}
        onRequestChange={() => this.props.onRequestChange()}
      >
        <AppBar iconElementLeft={<span></span>} />
        <MenuItem leftIcon={<FontIcon color={'black'} className="material-icons">home</FontIcon>} onTouchTap={() => this.goToRoute('/')}>home</MenuItem>
        <MenuItem leftIcon={<FontIcon color={'black'} className="material-icons">list</FontIcon>} onTouchTap={() => this.goToRoute('/notes')}>notes</MenuItem>
        <MenuItem leftIcon={<FontIcon color={'black'} className="material-icons">add</FontIcon>} onTouchTap={() => this.goToRoute('/notes/add')}>add note</MenuItem>
      </Drawer>
    )
  }
}

MainMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  docked: PropTypes.bool.isRequired,
  onRequestChange: PropTypes.func.isRequired,
}

export default withRouter(MainMenu)
