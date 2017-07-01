import React from 'react'
import PropTypes from 'prop-types'

import AppBar from 'material-ui/AppBar'
import Chip from 'material-ui/Chip'
import Drawer from 'material-ui/Drawer'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { getNotes } from 'ducks/notes'
import { toggleTag } from 'ducks/tags'


class TagsMenu extends React.Component {

  goToRoute = (route) => {
    this.props.history.push(route)
    if (!this.props.docked) {
      this.props.onRequestChange()
    }
  }

  toggleSelectedTag = async (tag) => {
    await this.props.toggleTag(tag.key)
    this.props.getNotes()
  }

  renderTags = () => {
    return this.props.tags.map((tag, index) => {
      let style = {
        marginTop: '5px',
        marginBottom: '5px',
        cursor: 'pointer',
      }
      if (this.props.selectedTags.includes(tag.key)) {
        style.backgroundColor = 'red'
      }
      return <Chip
                key={index}
                style={style}
                onTouchTap={() => this.toggleSelectedTag(tag)}
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

const mapStateToProps = (state) => {
  return {
    selectedTags: state.tags.selectedTags
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleTag: (tag) => dispatch(toggleTag(tag)),
    getNotes: () => dispatch(getNotes())
  }
}

let Container = connect(mapStateToProps, mapDispatchToProps)(TagsMenu)

export default withRouter(Container)
