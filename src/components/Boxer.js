import React from 'react'
import { Box } from '@smooth-ui/core-em'
import flattenChildren from 'react-flatten-children'

export function Boxer({ children, ...props }) {
  return flattenChildren(children).map(child => (
    <Box key={child.key} {...props}>
      {child}
    </Box>
  ))
}
