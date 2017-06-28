import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


class ListView extends Component {
  render() {
    return (
      <div>
        <h1>ListView</h1>
        <Link to="/notes/add">add note</Link>
        <ul>
          {this.props.notes.map((n, index) => <li key={index}>{n.title}</li>)}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notes: state.notes.notes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ListView)
