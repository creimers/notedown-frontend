import React from 'react'
import PropTypes from 'prop-types'

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
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
        <MenuItem onTouchTap={() => this.goToRoute('/')}>home</MenuItem>
        <MenuItem onTouchTap={() => this.goToRoute('/notes')}>notes</MenuItem>
        <MenuItem onTouchTap={() => this.goToRoute('/notes/add')}>add note</MenuItem>
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
