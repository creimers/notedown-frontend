import React from 'react'
import PropTypes from 'prop-types'

import AppBar from 'material-ui/AppBar'
import Chip from 'material-ui/Chip'
import Drawer from 'material-ui/Drawer'
import { withRouter } from 'react-router-dom'


class TagsMenu extends React.Component {
  state = {
    activeTags: []
  }

  goToRoute = (route) => {
    this.props.history.push(route)
    if (!this.props.docked) {
      this.props.onRequestChange()
    }
  }

  toggleTag = (tag) => {
    let activeTags = this.state.activeTags
    if (!this.state.activeTags.includes(tag)) {
      activeTags.push(tag)
    }
    else {
      let i = activeTags.findIndex(t => t === tag)
      activeTags.splice(i, 1)
    }
    this.setState({activeTags})
  }

  renderTags = () => {
    return this.props.tags.map((tag, index) => {
      let style = {
        marginTop: '5px',
        marginBottom: '5px',
        cursor: 'pointer',
      }
      if (this.state.activeTags.includes(tag.key)) {
        style.backgroundColor = 'red'
      }
      return <Chip
                key={index}
                style={style}
                onTouchTap={() => this.toggleTag(tag.key)}
              >
                { tag.key }
              </Chip>
    })
  }

  render() {
    return (
      <Drawer
        open={this.props.open}
        openSecondary={true}
        docked={this.props.docked}
        onRequestChange={() => this.props.onRequestChange()}
      >
        <AppBar iconElementLeft={<span></span>} title="Tags" />
        <div style={{display: 'flex', flexDirection: 'column', paddingLeft: '10px', paddingTop: '10px'}}>
          {this.renderTags()}
        </div>
      </Drawer>
    )
  }
}

TagsMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  docked: PropTypes.bool.isRequired,
  onRequestChange: PropTypes.func.isRequired,
  tags: PropTypes.array.isRequired,
}

export default withRouter(TagsMenu)
