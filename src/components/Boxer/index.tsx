import PropTypes from 'prop-types'
import React, { Children, FunctionComponent } from 'react'
import Box from '../Box'

const Boxer: FunctionComponent = ({ children, ...props }) => (
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
