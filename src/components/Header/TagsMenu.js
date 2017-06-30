import React from 'react'
import PropTypes from 'prop-types'

import AppBar from 'material-ui/AppBar'
import Chip from 'material-ui/Chip'
import Drawer from 'material-ui/Drawer'
import { withRouter } from 'react-router-dom'


class TagsMenu extends React.Component {
  state = {
    tags: [],
    activeTags: []
  }

  goToRoute = (route) => {
    this.props.history.push(route)
    if (!this.props.docked) {
      this.props.onRequestChange()
    }
  }

  renderTags = () => {
    return this.props.tags.map((tag, index) => {
      return <Chip key={index}>{ tag.key }</Chip>
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
        <div style={{display: 'flex', flexDirection: 'column'}}>
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
