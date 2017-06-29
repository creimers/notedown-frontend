import React, { Component } from 'react'

import Snackbar from 'material-ui/Snackbar'

import NoteForm from 'components/NoteForm'
import { db } from 'utils/db'
import { datetimeToLocaleString } from 'utils/helpers'


class EditView extends Component {
  state = {
    note: {
      body: '',
      title: '',
      tags: []
    },
    showEditSuccess: false
  }

  componentDidMount() {
    this.getNote()
  }

  getNote = async () => {
    let noteId = this.props.match.params.noteId
    let note = await db.get(noteId)
    this.setState({note})
  }

  saveNote = async (editedNote) => {
    let d = new Date()
    let edited = d.toISOString()
    let noteToSave = {
      ...editedNote,
      created: this.state.note.created,
      edited,
      _id: this.state.note._id,
      _rev: this.state.note._rev,
    }

    await db.put(noteToSave)
    this.setState({showEditSuccess: true})
    this.props.history.push(`/notes/${this.state.note._id}`)
  }

  render() {
    return (
      <div>
        <small>created: {datetimeToLocaleString(this.state.note.created)}</small>
        <NoteForm
          title={this.state.note.title}
          body={this.state.note.body}
          tags={this.state.note.tags}
          onSave={this.saveNote}
        />
        <Snackbar
          open={this.state.showEditSuccess}
          message="Note updated."
          autoHideDuration={2000}
        />
      </div>
    )
  }
}

export default EditView
