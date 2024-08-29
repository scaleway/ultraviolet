import type { Theme } from '@emotion/react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Badge, zoomIn } from '@ultraviolet/ui'
import { MAX_CELL_WIDTH } from './constants'

const spacedChildren = css`
  > * {
    margin-top: 0;
  }

  > * + * {
    margin-top: 16px;
  }
`

export const StyledDiv = styled.div`
  margin-left: 4px;
`

export const StyledTable = styled('table', {
  shouldForwardProp: prop => !['noTotal'].includes(prop),
})<{ noTotal: boolean }>`
  width: 100%;
  ${spacedChildren};
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  ${({ noTotal }) =>
    noTotal ? 'border-radius: 4px;' : 'border-radius: 4px 4px 0 4px;'}
`

export const StyledFeesTable = styled('table')`
  width: 100%;
  ${spacedChildren};
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  border-radius: 4px;
  margin-top: 16px;
`

export const PriceCol = styled.col`
  background-color: ${({ theme }) => theme.colors.neutral.background};
`

export const PriceCell = (theme: Theme) => css`
  border-left: 1px solid ${theme.colors.neutral.border};
  background-color: ${theme.colors.neutral.backgroundWeak};
`

export const Cell = styled('td', {
  shouldForwardProp: prop =>
    !['tabulation', 'hasBorder', 'primary'].includes(prop),
})<{ hasBorder?: boolean; tabulation?: number; primary?: boolean }>`
  padding-left: ${({ tabulation }) => (tabulation ?? 0) * 8 + 16}px;
  padding-right: 16px;
  position: relative;
  max-width: ${MAX_CELL_WIDTH};

  ${({ theme, hasBorder }) =>
    hasBorder &&
    css`
      &:before {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        height: 1px;
        width: calc(100% - 32px);
        margin-left: 16px;
        border-bottom: 1px solid ${theme.colors.neutral.border};
      }
    `}
  ${({ theme, primary }) =>
    primary
      ? css`
          background: ${theme.colors.primary.background};
        `
      : null}
`

export const TotalPriceCell = styled(Cell)`
  border-color: ${({ theme }) => theme.colors.neutral.border};
  border-style: solid;
  border-width: 0 1px 1px 1px;
  border-radius: 0 0 4px 4px;
  min-width: 202px;
  height: 56px;
  background-color: ${({ theme }) => theme.colors.primary.background};
`

export const EmptyTable = styled.table`
  margin: 0;
  width: 100%;
`

export const Title = styled.h3`
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.neutral.text};
  font-weight: 500;
  padding: ${({ theme }) => theme.space['2']};
`

export const EmptyCell = styled.td`
  width: 538px;
`

export const TimeCell = styled.div`
  max-width: 200px;
  padding: 16px;
  align-items: start;
  text-align: left;
  float: right;
`

export const BadgeBeta = styled(Badge, {
  shouldForwardProp: prop => !['long'].includes(prop),
})<{ long: boolean }>`
  margin-left: ${({ long }) => (long ? '-185px' : '-115px')};
  position: absolute;
  top: calc(50% - 16px);
`

export const StyledTr = styled('tr', {
  shouldForwardProp: prop =>
    !['isFirstElement', 'shouldBeHidden', 'hideFromOverlay'].includes(prop),
})<{
  isFirstElement?: boolean
  shouldBeHidden?: boolean
  hideFromOverlay?: boolean
}>``

export const OverlayRow = styled('li', {
  shouldForwardProp: prop =>
    !['isFirstElement', 'shouldBeHidden', 'hideFromOverlay'].includes(prop),
})<{
  isFirstElement?: boolean
  shouldBeHidden?: boolean
  hideFromOverlay?: boolean
}>`
  min-width: 200px;
  padding: 0 24px;
  border-left: 1px solid ${({ theme }) => theme.colors.neutral.border};

  ${({ isFirstElement }) => isFirstElement && `border: 0;`}
  &:first-of-type,
  &:last-child {
    border: 0;
  }

  @media (max-width: 1600px) {
    ${({ shouldBeHidden }) => shouldBeHidden && 'display: none;'}
  }

  ${({ hideFromOverlay }) => hideFromOverlay && 'display: none;'}
`

export const StyledLeftSide = styled.div`
  display: flex;
  flex-direction: row;
  -webkit-box-pack: justify;
  justify-content: space-between;
  align-items: center;
  min-height: 56px;
  padding-top: 8px;
  padding-bottom: 8px;
`

export const ItemResourceName = styled('div', {
  shouldForwardProp: prop => !['animated'].includes(prop),
})<{ animated: boolean }>`
  height: 48px;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  animation: ${({ animated }) => (animated ? css`800ms ${zoomIn}` : '')};
`

export const StyledBadge = styled(Badge)`
  display: inline-block;
  height: 24px;
  line-height: 18px;
  font-size: 12px;
  margin-right: 8px;
`
