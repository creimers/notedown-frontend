import React, { Component } from 'react'

import { getDB } from 'utils/db'

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

  renderDatetime = (isoDatetime) => {
    let d = new Date(isoDatetime)
    return d.toLocaleString()
  }

  render() {
    return (
      <div>
        <h1>{this.state.note.title}</h1>
        <small>created: {this.renderDatetime(this.state.note.created)}</small>
        <NoteAsMarkdown source={this.state.note.body} />
      </div>
    )
  }
}

export default DetailView
