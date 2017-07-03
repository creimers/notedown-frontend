import React, { Component } from 'react'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Snackbar from 'material-ui/Snackbar'
import withWidth from 'material-ui/utils/withWidth'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { toggleTagsMenu } from 'ducks/app'
import { clearSelectedTags, extractTags } from 'ducks/tags'
import { getNotes } from 'ducks/notes'

import { db } from 'utils/db'

import NotePreview from './NotePreview'
import TagsMenu from './TagsMenu'


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

    window.addEventListener('sync', () => {
      this.props.getNotes()
      this.props.getTags()
    })
  }

  componentWillUnmount() {
    window.removeEventListener('sync', () => console.log('removed sync event listener'))
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
    let tagsMenuOpen = this.props.tagsMenuOpen || (this.props.location.pathname === '/notes' && this.props.width === 3)
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
        <TagsMenu
          open={tagsMenuOpen}
          showHeader={this.props.width===3}
          docked={this.props.width===3}
          onRequestChange={this.props.toggleTagsMenu}
          tags={this.props.tags}
        />
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
    notes: state.notes.notes,
    tagsMenuOpen: state.app.tagsMenuOpen,
    tags: state.tags.tags
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTags: () => dispatch(extractTags()),
    clearSelectedTags: () => dispatch(clearSelectedTags()),
    getNotes: () => dispatch(getNotes()),
    toggleTagsMenu: () => dispatch(toggleTagsMenu())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(ListView))
