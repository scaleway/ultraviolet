import React from 'react'
import flattenChildren from 'react-flatten-children'
import { Box } from 'components/Box'

export function Boxer({ children, ...props }) {
  return flattenChildren(children).map(child => (
    <Box key={child.key} {...props}>
      {child}
    </Box>
  ))
}
