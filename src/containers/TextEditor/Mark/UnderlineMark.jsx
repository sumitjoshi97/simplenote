import React from 'react'

const Underlinemark = props => {
  return (
      <u {...props.attributes}>
          {props.children}
      </u>
  )
}

export default Underlinemark
