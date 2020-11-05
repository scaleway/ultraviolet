import React from 'react'
import flattenChildren from 'react-flatten-children'

const BlockList = ({ children }) =>
  flattenChildren(children).map((child, index) => (
    <div key={index} style={{ margin: '30px 0' }}>
      {child}
    </div>
  ))

export default BlockList
