import React, { Component } from 'react'

import AppBar from 'material-ui/AppBar'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import withWidth from 'material-ui/utils/withWidth'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { toggleTagsMenu } from 'ducks/app'

import MainMenu from './MainMenu'


class Header extends Component {
  state = {
    mainMenuOpen: false,
  }

  toggleMainMenu = () => {
    this.setState({mainMenuOpen: !this.state.mainMenuOpen})
  }

  toggleTagsMenu = () => {
    this.props.toggleTagsMenu()
  }

  render() {
    let mainMenuOpen = this.state.mainMenuOpen || this.props.width === 3
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
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleTagsMenu: () => dispatch(toggleTagsMenu())
  }
}

let Container = connect(mapStateToProps, mapDispatchToProps)(Header)


export default withRouter(withWidth()(Container))
