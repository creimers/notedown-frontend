import React from 'react'

import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'


const NoteAsMarkdown = (props) => (
  <ReactMarkdown source={props.source} />
)

NoteAsMarkdown.propTypes = {
  source: PropTypes.string.isRequired
}

export default NoteAsMarkdown
