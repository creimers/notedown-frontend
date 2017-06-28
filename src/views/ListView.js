import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import { getDB } from 'utils/db'


class ListView extends Component {

  state = {
    notes: {rows:[]}
  }

  componentDidMount() {
    this.getNotes()
  }

  getNotes = async () => {
    let db = getDB()
    let notes = await db.allDocs({include_docs: true})
    this.setState({notes})
  }

  render() {
    return (
      <div>
        <h1>ListView</h1>
        <Link to="/notes/add">add note</Link>
        <ul>
          {this.state.notes.rows.map((note, index) => <li key={index}>{note.doc.title}</li>)}
        </ul>
      </div>
    )
  }
}
export default ListView
