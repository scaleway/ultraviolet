import PropTypes from 'prop-types'
import React, { Children, ReactNode } from 'react'
import Box, { BoxProps } from '../Box'

type BoxerProps = BoxProps & {
  children: ReactNode
}

const Boxer = ({ children, ...props }: BoxerProps): JSX.Element => (
  <>
    {Children.map(children, child => (
      <Box {...props}>{child}</Box>
    ))}
  </>
)

Boxer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Boxer
