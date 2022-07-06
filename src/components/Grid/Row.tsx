import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { ReactNode } from 'react'
import { Spaces, space } from '../../theme'
import Box, { BoxProps } from '../Box'

type RowProps = {
  children: ReactNode
  gutter?: Spaces
} & BoxProps

const StyledRow = styled(Box, {
  shouldForwardProp: prop => !['gutter'].includes(prop),
})<RowProps>`
  flex-grow: 1;
  flex-wrap: wrap;
  display: flex;
  margin-left: ${({ gutter = 1 }) => `-${space[gutter]}`};
  margin-right: ${({ gutter = 1 }) => `-${space[gutter]}`};
`

/**
 * @deprecated
 */
const Row = (props: RowProps) => <StyledRow {...props} />

Row.propTypes = {
  children: PropTypes.node,
  gutter: PropTypes.oneOf<Spaces>(Object.keys(space).map(Number) as Spaces[]),
}

export default Row
