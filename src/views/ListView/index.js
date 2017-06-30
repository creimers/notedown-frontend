import React, { Component } from 'react'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Snackbar from 'material-ui/Snackbar'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { clearSelectedTags, extractTags } from 'ducks/tags'
import { db } from 'utils/db'

import NotePreview from './NotePreview'


class ListView extends Component {

  state = {
    notes: [],
    showDeleteDialog: false,
    showDeleteSnackbar: false,
    noteToDelete: undefined
  }

  componentDidMount() {
    this.getNotes()
    this.props.getTags()
    this.props.clearSelectedTags()
  }

  getNotes = async () => {
    let notes = await db.find({
      selector: {
        created: {$gt: null}
      },
      sort: [{created: 'desc'}]
    })
    this.setState({notes: notes.docs})
  }

  showDeleteNoteDialog = (note) => {
    this.setState({showDeleteDialog: true, noteToDelete: note})
  }

  hideDeleteNoteDialog = () => {
    this.setState({showDeleteDialog: false})
  }

  hideDeleteSnackbar = () => {
    this.setState({showDeleteSnackbar: false})
  }

  deleteNote = async () => {
    this.hideDeleteNoteDialog()
    let note = this.state.noteToDelete
    await db.remove(note)
    this.setState({showDeleteSnackbar: true})
    this.getNotes()
    this.props.getTags()
  }

  goToEditView = (note) => {
    this.props.history.push(`/notes/${note._id}/edit`)
  }

  renderNotePreviews = () => {
    if (this.state.notes.length > 0) {
      return this.state.notes.map((note, index) => <NotePreview key={index} note={note} onDelete={this.showDeleteNoteDialog} onEdit={this.goToEditView}/>)
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
          onRequestClose={() => this.hideDeleteSnackbar()}
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
    getTags: () => dispatch(extractTags()),
    clearSelectedTags: () => dispatch(clearSelectedTags())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListView)
