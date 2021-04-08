import React from 'react'
import flattenChildren from 'react-flatten-children'
import Box from '../Box'

const Boxer = ({ children, ...props }) =>
  flattenChildren(children).map(child => (
    <Box key={child.key} {...props}>
      {child}
    </Box>
  ))

export default Boxer
