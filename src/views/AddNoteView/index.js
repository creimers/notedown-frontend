import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import NoteForm from 'components/NoteForm'
import { db } from 'utils/db'


class AddNoteView extends Component {

  saveNote = async (note) => {
    let d = new Date()
    let _id = d.toISOString()
    await db.put({
      ...note,
      _id,
      created: _id,
      type: 'note'
    })
    this.props.history.push('/notes')
  }

  render() {
    return (
      <div>
        <h1>Add a Note</h1>
        <NoteForm
          title=""
          body=""
          tags={[]}
          onSave={this.saveNote}
        />
      </div>
    )
  }
}


export default withRouter(AddNoteView)
