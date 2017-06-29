import React from 'react'
import PropTypes from 'prop-types'
import Chip from 'material-ui/Chip'


const Tags = (props) => {
  return (
    <div style={{display: 'flex', marginTop: '10px', marginBottom: '10px'}}>
      {props.tags.map((tag, index) => <Chip style={{marginRight: 10}} key={index}>{tag}</Chip>)}
  </div>
  )
}

Tags.propTypes = {
  tags: PropTypes.array.isRequired
}

export default Tags
