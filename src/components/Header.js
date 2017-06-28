import React, { Component } from 'react'

import AppBar from 'material-ui/AppBar'
import withWidth from 'material-ui/utils/withWidth'

import MainMenu from 'components/MainMenu'


class Header extends Component {
  state = {
    mainMenuOpen: false
  }

  toggleMainMenu = () => {
    this.setState({mainMenuOpen: !this.state.mainMenuOpen})
  }

  render() {
    let mainMenuOpen = this.state.mainMenuOpen || this.props.width === 3
    return (
      <div>
        <AppBar
          onLeftIconButtonTouchTap={this.toggleMainMenu}
        />
        <MainMenu
          open={mainMenuOpen}
          showHeader={this.props.width===3}
          docked={this.props.width===3}
          onRequestChange={this.toggleMainMenu}
        />
      </div>
    )
  }
}

export default withWidth()(Header)
