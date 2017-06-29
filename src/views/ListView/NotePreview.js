import React from 'react'
import PropTypes from 'prop-types'

import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'

import { Link } from 'react-router-dom'

import Tags from 'components/Tags'
import { datetimeToLocaleString } from 'utils/helpers'


const NotePreview = (props) => (
  <div style={{marginTop: '25px', marginBottom: '25px'}}>
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <div>
        <h3>
          <Link style={{color: 'black'}}to={`/notes/${props.note._id}`}>{props.note.title}</Link>
        </h3>
        <small>{datetimeToLocaleString(props.note.created)}</small>
      </div>
      <IconMenu
        iconButtonElement={<IconButton><FontIcon color={'black'} className="material-icons">more_horiz</FontIcon></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem
          primaryText="edit"
          leftIcon={<FontIcon color={'black'} className="material-icons">edit</FontIcon>}
          onTouchTap={() => props.onEdit(props.note)}
        />
        <MenuItem
          primaryText="delete"
          leftIcon={<FontIcon color={'black'} className="material-icons">close</FontIcon>}
          onTouchTap={() => props.onDelete(props.note)}
        />
      </IconMenu>
    </div>
    <Tags tags={props.note.tags}/>
  </div>
)

NotePreview.propTypes = {
  note: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
}

export default NotePreview
