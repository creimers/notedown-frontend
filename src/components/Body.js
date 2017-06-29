import React from 'react'

import withWidth from 'material-ui/utils/withWidth'


const Body = (props) => {
  let bodyStyle = {
    marginLeft: props.width === 3 ? 256 : 0,
    paddingLeft: '15px',
    paddingRight: '15px'
  }

  return (
    <main style={bodyStyle}>
      {props.children}
    </main>
    )
}

export default withWidth()(Body)
