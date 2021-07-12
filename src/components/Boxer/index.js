import PropTypes from 'prop-types'
import React from 'react'
import flattenChildren from 'react-flatten-children'
import Box from '../Box'

const SubBoxer = ({ children, ...props }) =>
  flattenChildren(children).map(child => (
    <Box key={child.key} {...props}>
      {child}
    </Box>
  ))

const Boxer = props => <SubBoxer {...props} />

Boxer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Boxer
