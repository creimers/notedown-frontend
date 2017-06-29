import React, { Component } from 'react'

import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'

import { getDB } from 'utils/db'
import { datetimeToLocaleString } from 'utils/helpers'

import NoteAsMarkdown from 'components/NoteAsMarkdown'


class DetailView extends Component {
  state = {
    note: {body: ''}
  }

  componentDidMount() {
    this.getNote()
  }

  getNote = async () => {
    let noteId = this.props.match.params.noteId
    let db = getDB() // TODO: put in constructor?
    let note = await db.get(noteId)
    this.setState({note})
  }

  goToEditView = () => {
    let editTarget = this.props.location.pathname + '/edit'
    this.props.history.push(editTarget)
  }

  render() {
    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h1>{this.state.note.title}</h1>
          <IconButton onTouchTap={this.goToEditView}>
            <FontIcon color={'black'} className="material-icons">edit</FontIcon>
          </IconButton>
        </div>
        <small>created: {datetimeToLocaleString(this.state.note.created)}</small>
        <NoteAsMarkdown source={this.state.note.body} />
      </div>
    )
  }
}

export default DetailView
