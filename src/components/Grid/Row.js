import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { space } from '../../new_theme'
import { Box } from '../Box'

const Row = styled(Box, {
  shouldForwardProp: prop => !['gutter'].includes(prop),
})`
  box-sizing: border-box;
  flex-grow: 1;
  flex-wrap: wrap;
  display: flex;
  margin-left: ${({ gutter }) => `-${space[gutter]}`};
  margin-right: ${({ gutter }) => `-${space[gutter]}`};
`

Row.defaultProps = {
  gutter: 1,
}

Row.propTypes = {
  children: PropTypes.node.isRequired,
  gutter: PropTypes.oneOf(Object.keys(space).map(Number)),
}

export default Row
