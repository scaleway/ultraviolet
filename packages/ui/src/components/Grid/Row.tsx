import styled from '@emotion/styled'
import { ReactNode } from 'react'
import { Spaces, space } from '../../theme'

type RowProps = {
  children: ReactNode
  gutter?: Spaces
}

/**
 * @deprecated
 */
const Row = styled('div', {
  shouldForwardProp: prop => !['gutter'].includes(prop),
})<RowProps>`
  flex-grow: 1;
  flex-wrap: wrap;
  display: flex;
  margin-left: ${({ gutter = 1 }) => `-${space[gutter]}`};
  margin-right: ${({ gutter = 1 }) => `-${space[gutter]}`};
`

export default Row
