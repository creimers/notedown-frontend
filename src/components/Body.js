import React from 'react'

import withWidth from 'material-ui/utils/withWidth'


const Body = (props) => {
  let bodyStyle = {
    marginLeft: props.width === 3 ? 256 : 0,
    marginRight: props.width === 3 ? 256 : 0,
    paddingLeft: '15px',
    paddingRight: '15px',
    height: 'calc(100vh - 64px)',
    overflow: 'scroll'
  }

  return (
    <main style={bodyStyle}>
      {props.children}
    </main>
    )
}

export default withWidth()(Body)
