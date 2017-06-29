import React, { Component } from 'react'

import AppBar from 'material-ui/AppBar'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import withWidth from 'material-ui/utils/withWidth'
import { withRouter } from 'react-router-dom'

import MainMenu from './MainMenu'
import TagsMenu from './TagsMenu'


class Header extends Component {
  state = {
    mainMenuOpen: false,
    tagsMenuOpen: false
  }

  toggleMainMenu = () => {
    this.setState({mainMenuOpen: !this.state.mainMenuOpen})
  }

  toggleTagsMenu = () => {
    this.setState({tagsMenuOpen: !this.state.tagsMenuOpen})
  }

  render() {
    let mainMenuOpen = this.state.mainMenuOpen || this.props.width === 3
    let tagsMenuOpen = this.state.tagsMenuOpen || (this.props.location.pathname === '/notes' && this.props.width === 3)
    let rightIcon = this.props.location.pathname === '/notes' ? <IconButton onTouchTap={this.toggleTagsMenu}><FontIcon color={'white'} className="material-icons">local_offer</FontIcon></IconButton> : <span></span>
    return (
      <div>
        <AppBar
          onLeftIconButtonTouchTap={this.toggleMainMenu}
          iconElementRight={rightIcon}
        />
        <MainMenu
          open={mainMenuOpen}
          showHeader={this.props.width===3}
          docked={this.props.width===3}
          onRequestChange={this.toggleMainMenu}
        />
        <TagsMenu
          open={tagsMenuOpen}
          showHeader={this.props.width===3}
          docked={this.props.width===3}
          onRequestChange={this.toggleTagsMenu}
          tags={['eins', 'zwo']}
        />
      </div>
    )
  }
}

export default withRouter(withWidth()(Header))