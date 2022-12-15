import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import type { ScreenSize, Spaces } from '../../theme'
import { screens, space } from '../../theme'
import { up } from '../../utils'

const gridMaxWidths: Record<ScreenSize, string> = {
  large: '960px',
  medium: '720px',
  small: '540px',
  xlarge: '1140px',
  xsmall: '',
}

const query = (brk: ScreenSize, style: string) =>
  screens[brk] === 0 ? style : up(brk, style)

type GridProps = {
  children: ReactNode
  gutter?: Spaces
  fluid?: boolean
}

/**
 * @deprecated
 */
const Grid = styled('div', {
  shouldForwardProp: prop => !['gutter', 'fluid'].includes(prop),
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

export default Grid
