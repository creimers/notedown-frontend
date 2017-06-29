import React from 'react'
import PropTypes from 'prop-types'
import Chip from 'material-ui/Chip'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import { Link } from 'react-router-dom'


const NotePreview = (props) => (
  <div>
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <h3>
        <Link style={{color: 'black'}}to={`/notes/${props.note._id}`}>{props.note.title}</Link>
      </h3>
      <IconButton onTouchTap={() => props.onDelete(props.note)}>
        <FontIcon color={'black'} className="material-icons">close</FontIcon>
      </IconButton>
    </div>
    <div style={{display: 'flex'}}>
      {props.note.tags.map((tag, index) => <Chip style={{marginRight: 10}} key={index}>{tag}</Chip>)}
    </div>
  </div>
)

NotePreview.propTypes = {
  note: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default NotePreview
