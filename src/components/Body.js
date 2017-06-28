import React from 'react'

import withWidth from 'material-ui/utils/withWidth'


const Body = (props) => {
  let bodyStyle = {
    paddingLeft: props.width === 3 ? 256 : 0
  }

  return (
    <main style={bodyStyle}>
      {props.children}
    </main>
    )
}

export default withWidth()(Body)
