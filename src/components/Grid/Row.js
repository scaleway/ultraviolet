import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import { space } from '../../theme'
import Box from '../Box'

const StyledRow = styled(Box, {
  shouldForwardProp: prop => !['gutter'].includes(prop),
})`
  box-sizing: border-box;
  flex-grow: 1;
  flex-wrap: wrap;
  display: flex;
  margin-left: ${({ gutter }) => `-${space[gutter]}`};
  margin-right: ${({ gutter }) => `-${space[gutter]}`};
`

const Row = props => <StyledRow {...props} />

Row.defaultProps = {
  children: null,
  gutter: 1,
}

Row.propTypes = {
  children: PropTypes.node,
  gutter: PropTypes.oneOf(Object.keys(space).map(Number)),
}

export default Row
