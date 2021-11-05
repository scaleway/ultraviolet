import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { FunctionComponent, ReactNode } from 'react'
import { ScreenSize, Spaces, screens, space } from '../../theme'
import { up } from '../../utils'
import Box, { BoxProps } from '../Box'

const gridMaxWidths: Record<ScreenSize, string> = {
  large: '960px',
  medium: '720px',
  small: '540px',
  xlarge: '1140px',
  xsmall: '',
}

const query = (brk: ScreenSize, style: string) =>
  screens[brk] === 0 ? style : up(brk, style)

export type GridProps = {
  children: ReactNode
  gutter?: Spaces
  fluid?: boolean
} & BoxProps

const StyledGrid = styled(Box, {
  shouldForwardProp: prop => !['gutter', 'fluid'].includes(prop.toString()),
})<GridProps>`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: ${({ gutter = 1 }) => space[gutter]};
  padding-right: ${({ gutter = 1 }) => space[gutter]};
  ${({ fluid = false }) =>
    fluid
      ? ''
      : (Object.keys(screens) as ScreenSize[]).reduce(
          (style, brk) =>
            `${style} ${query(brk, `max-width: ${gridMaxWidths[brk]};`)}`,
          '',
        )}
`

const Grid: FunctionComponent<GridProps> = props => <StyledGrid {...props} />

Grid.propTypes = {
  children: PropTypes.node.isRequired,
  /**
   * If true, take all the parent width
   */
  fluid: PropTypes.bool,
  /**
   * padding left and right space
   */
  gutter: PropTypes.oneOf(Object.keys(space).map(Number) as Spaces[]),
}

export default Grid
