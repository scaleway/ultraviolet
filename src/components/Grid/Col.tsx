import styled from '@emotion/styled'
import { ReactNode } from 'react'
import { ScreenSize, Spaces, screens, space } from '../../theme'
import { up } from '../../utils'

const GRID_COLUMNS = 12

const getSizeWidth = (size: number, nbColumns: number) =>
  `${Math.round((size / nbColumns) * 10 ** 6) / 10 ** 4}%`
const query = (brk: ScreenSize, style: string) =>
  screens[brk] === 0 ? style : up(brk, style)

type ColProps = {
  children: ReactNode
  gutter?: Spaces
  fluid?: boolean
} & Partial<Record<ScreenSize, number | string | boolean>>

/**
 * @deprecated
 */

const Col = styled('div', {
  shouldForwardProp: prop =>
    ![...Object.keys(screens), 'gutter'].includes(prop),
})<ColProps>`
  flex-basis: 0;
  flex-grow: 1;
  max-width: 100%;
  position: relative;
  width: 100%;
  min-height: 1px;

  padding-left: ${({ gutter = 1 }) => space[gutter]};
  padding-right: ${({ gutter = 1 }) => space[gutter]};

  ${props =>
    (Object.keys(screens) as ScreenSize[])
      .filter(brk => props[brk] && props[brk] !== 0)
      .map(brk => {
        const rule = props[brk]

        if (rule === true) {
          return query(
            brk,
            `
          flex-basis: 0;
          flex-grow: 1;
          max-width: 100%;
        `,
          )
        }

        if (rule === 'auto') {
          return query(
            brk,
            `
          flex: 0 0 auto;
          max-width: none;
          width: auto;
        `,
          )
        }

        if (typeof rule === 'number') {
          const sizeWidth = getSizeWidth(rule, GRID_COLUMNS)

          return query(
            brk,
            `
            flex: 0 0 ${sizeWidth};
            max-width: ${sizeWidth};
          `,
          )
        }

        return null
      })}
`

export default Col
