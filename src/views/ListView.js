import React, { Component } from 'react'

import { Link } from 'react-router-dom'


class ListView extends Component {
  render() {
    return (
      <div>
        <h1>ListView</h1>
        <Link to="/notes/add">add note</Link>
      </div>
    )
  }
}
export default ListView
