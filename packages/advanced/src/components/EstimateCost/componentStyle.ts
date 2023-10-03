import type { Theme } from '@emotion/react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { zoomIn } from '@ultraviolet/ui'
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

export const styles = {
  emptyTable: css`
    margin: 0;
  `,
  title: (theme: Theme) => css`
    & > h3 {
      display: flex;
      align-items: center;
      padding: 0;
      margin: 0;
      font-size: 18px;
      color: ${theme.colors.neutral.text};
      font-weight: 500;
      padding: ${theme.space['2']};
    }
  `,
  priceCol: (theme: Theme) => css`
    background-color: ${theme.colors.neutral.background};
  `,

  cell:
    ({
      hasBorder,
      tabulation = 0,
      primary = false,
    }: {
      hasBorder: boolean
      tabulation?: number
      primary?: boolean
    }) =>
    (theme: Theme) => css`
      padding-left: ${tabulation * 8 + 16}px;
      padding-right: 16px;
      position: relative;
      max-width: ${MAX_CELL_WIDTH};

      ${hasBorder &&
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

      ${primary &&
      css`
        background: ${theme.colors.primary.background};
      `}
    `,

  priceCell: (theme: Theme) => css`
    border-left: 1px solid ${theme.colors.neutral.border};
    background-color: ${theme.colors.neutral.backgroundWeak};
  `,

  emptyCell: css`
    width: 538px;
  `,

  totalPriceCell: (theme: Theme) => css`
    border-color: ${theme.colors.neutral.border};
    border-style: solid;
    border-width: 0 1px 1px 1px;
    border-radius: 0 0 4px 4px;
    min-width: 195px;
    height: 56px;
    background-color: ${theme.colors.primary.background};
  `,

  itemResourceName: (animated: boolean) => css`
    height: 48px;
    display: flex;
    flex-direction: column;
    -webkit-box-pack: center;
    justify-content: center;
    animation: ${animated ? css`800ms ${zoomIn}` : ''};
  `,

  overlayElement: ({
    isFirstElement = false,
    shouldBeHidden = false,
    hideFromOverlay = false,
    theme,
  }: {
    theme: Theme
    isFirstElement?: boolean
    shouldBeHidden?: boolean
    hideFromOverlay?: boolean
  }) => css`
    min-width: 200px;
    padding: 0 24px;
    border-left: 1px solid ${theme.colors.neutral.border};

    ${isFirstElement && `border: 0;`}
    &:first-of-type,
    &:last-child {
      border: 0;
    }

    @media (max-width: 1420px) {
      ${shouldBeHidden && 'display: none;'}
    }

    ${hideFromOverlay && 'display: none;'}
  `,

  strong:
    (variant: 'normal' | 'small' | 'big' | 'capitalized') =>
    (theme: Theme) => css`
      display: inline-flex;
      align-items: center;
      font-size: ${variant === 'big' ? 24 : 16}px;
      ${variant === 'capitalized' ? `text-transform: capitalize;` : ''}
      color: ${theme.colors.neutral.textStrong};
      font-weight: 500;
      margin-right: 4px;
    `,
  regular:
    (variant: 'normal' | 'small' | 'big' | 'capitalized', isOverlay: boolean) =>
    (theme: Theme) => css`
      display: ${isOverlay ? 'flex' : 'inline-flex'};
      max-width: 500px;
      align-items: center;
      font-size: 16px;
      color: ${theme.colors.neutral.textStrong};
      margin-right: 4px;

      ${variant === 'small' &&
      css`
        display: block;
        font-size: 14px;
        line-height: 8px;
        color: ${theme.colors.neutral.text};
      `};
    `,

  leftSide: css`
    display: flex;
    flex-direction: row;
    -webkit-box-pack: justify;
    justify-content: space-between;
    align-items: center;
    min-height: 56px;
    padding-top: 8px;
    padding-bottom: 8px;
  `,

  subLabel: css`
    font-style: italic;
  `,

  time: css`
    width: 193px;
    padding: 16px;
    align-items: start;
    text-align: left;
    float: right;
  `,

  lineThrough: (theme: Theme) => css`
    text-decoration-line: line-through;
    text-decoration-color: ${theme.colors.warning.border};
  `,

  badge: css`
    display: inline-block;
    height: 24px;
    line-height: 18px;
    font-size: 12px;
    margin-right: 8px;
  `,

  badgeBeta: css`
    margin-left: -115px;
    position: absolute;
    top: calc(50% - 16px);
  `,
  // longTextBadgeBeta for long length text,
  // TODO it cleaner when refactoring Estimate cost
  longTextBadgeBeta: css`
    margin-left: -185px;
    position: absolute;
    top: calc(50% - 16px);
  `,
}
