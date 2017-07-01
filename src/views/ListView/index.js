import React, { Component } from 'react'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Snackbar from 'material-ui/Snackbar'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { clearSelectedTags, extractTags } from 'ducks/tags'
import { getNotes } from 'ducks/notes'

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
    this.props.getNotes()
    this.props.getTags()
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

  // TODO: put in duck
  deleteNote = async () => {
    this.hideDeleteNoteDialog()
    let note = this.state.noteToDelete
    await db.remove(note)
    this.setState({showDeleteSnackbar: true})

    this.props.getNotes()
    this.props.getTags()
  }

  goToEditView = (note) => {
    this.props.history.push(`/notes/${note._id}/edit`)
  }

  renderNotePreviews = () => {
    if (this.props.notes.length > 0) {
      return this.props.notes.map((note, index) => <NotePreview key={index} note={note} onDelete={this.showDeleteNoteDialog} onEdit={this.goToEditView}/>)
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
    selectedTags: state.tags.selectedTags,
    notes: state.notes.notes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTags: () => dispatch(extractTags()),
    clearSelectedTags: () => dispatch(clearSelectedTags()),
    getNotes: () => dispatch(getNotes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListView)
