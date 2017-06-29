import React from 'react'
import PropTypes from 'prop-types'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import { Link } from 'react-router-dom'

import Tags from 'components/Tags'


const NotePreview = (props) => (
  <div style={{marginTop: '25px', marginBottom: '25px'}}>
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <h3>
        <Link style={{color: 'black'}}to={`/notes/${props.note._id}`}>{props.note.title}</Link>
      </h3>
      <IconButton onTouchTap={() => props.onDelete(props.note)}>
        <FontIcon color={'black'} className="material-icons">close</FontIcon>
      </IconButton>
    </div>
    <Tags tags={props.note.tags}/>
  </div>
)

NotePreview.propTypes = {
  note: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default NotePreview
