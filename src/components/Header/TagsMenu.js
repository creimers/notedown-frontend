/* globals emit sum */

import React from 'react'
import PropTypes from 'prop-types'

import AppBar from 'material-ui/AppBar'
import Chip from 'material-ui/Chip'
import Drawer from 'material-ui/Drawer'
import { withRouter } from 'react-router-dom'

import { db } from 'utils/db'


class TagsMenu extends React.Component {
  state = {
    tags: [],
    activeTags: []
  }

  componentDidMount() {
    // TODO SOLUTION redux
    this.getAllTags()
  }

  getAllTags = async () => {

    const map = (doc) => {
      if(doc.tags.length > 0) {
        doc.tags.forEach(tag => {emit(tag, 1)})
      }
    }    

    const reduce = (keys, values) => {
      return sum(values)
    }

    let tags = await db.query(
      {map, reduce},
      {reduce: true, group: true, group_leve: 1}
    )
    this.setState({tags: tags.rows})
  }

  goToRoute = (route) => {
    this.props.history.push(route)
    if (!this.props.docked) {
      this.props.onRequestChange()
    }
  }

  renderTags = () => {
    return this.state.tags.map((tag, index) => {
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
}

export default withRouter(TagsMenu)
