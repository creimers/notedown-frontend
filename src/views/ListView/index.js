import React, { Component } from 'react'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Snackbar from 'material-ui/Snackbar'

import { Link } from 'react-router-dom'

import { getDB } from 'utils/db'

import NotePreview from './NotePreview'


class ListView extends Component {

  state = {
    notes: {rows:[]},
    showDeleteDialog: false,
    showDeleteSnackbar: false,
    noteToDelete: undefined
  }

  componentDidMount() {
    this.getNotes()
  }

  getNotes = async () => {
    let db = getDB() // TODO: put in constructor?
    let notes = await db.allDocs({include_docs: true, descending: true})
    this.setState({notes})
  }

  showDeleteNoteDialog = (note) => {
    this.setState({showDeleteDialog: true, noteToDelete: note})
  }

  hideDeleteNoteDialog = () => {
    this.setState({showDeleteDialog: false})
  }

  deleteNote = async () => {
    this.hideDeleteNoteDialog()
    let note = this.state.noteToDelete
    let db = getDB()
    await db.remove(note)
    this.setState({showDeleteSnackbar: true})
    this.getNotes()
  }

  goToEditView = (note) => {
    this.props.history.push(`/notes/${note._id}/edit`)
  }

  renderNotePreviews = () => {
    if (this.state.notes.rows.length > 0) {
      return this.state.notes.rows.map((note, index) => <NotePreview key={index} note={note.doc} onDelete={this.showDeleteNoteDialog} onEdit={this.goToEditView}/>)
    }
    else {
      return <p>You don't have any notes yet.</p>
    }
  }

  render() {
    const deleteDialogActions = [
      <FlatButton secondary={true} label="cancel" onTouchTap={this.hideDeleteNoteDialog}/>,
      <FlatButton primary={true} label="yes" onTouchTap={this.deleteNote}/>
    ]
    return (
      <div>
        <h1>Notes</h1>
        <Link to="/notes/add">add a note</Link>
        {this.renderNotePreviews()}
        <Dialog
          actions={deleteDialogActions}
          modal={true}
          open={this.state.showDeleteDialog}
        >
          <p>Do you really want to delete this note?</p>
        </Dialog>
        <Snackbar
          open={this.state.showDeleteSnackbar}
          message="Note deleted."
          autoHideDuration={3000}
        />
      </div>
    )
  }
}
export default ListView
