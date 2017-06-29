import React, { Component } from 'react'

import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'

import { db } from 'utils/db'
import { datetimeToLocaleString } from 'utils/helpers'

import NoteAsMarkdown from 'components/NoteAsMarkdown'
import Tags from 'components/Tags'


class DetailView extends Component {
  state = {
    note: {body: '', tags: []}
  }

  componentDidMount() {
    this.getNote()
  }

  getNote = async () => {
    let noteId = this.props.match.params.noteId
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
        <div>
          <small>created: {datetimeToLocaleString(this.state.note.created)}</small>
        </div>
        {this.state.note.edited !== undefined ? 
          <div>
            <small>edited: {datetimeToLocaleString(this.state.note.edited)}</small>
          </div>
          : <span></span>
        }
        <Tags tags={this.state.note.tags} />
        <NoteAsMarkdown source={this.state.note.body} />
      </div>
    )
  }
}

export default DetailView
