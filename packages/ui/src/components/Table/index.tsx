import type { Theme } from '@emotion/react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import { Skeleton } from '../Skeleton'

const sharedCellStyle = (theme: Theme) => css`
  padding: ${theme.space['1']} ${theme.space['2']};
  font-size: ${theme.typography.bodySmall.fontSize};
  line-height: ${theme.typography.bodySmall.lineHeight};
`

const StyledTable = styled.table`
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
`

export const Table: ((props: {
  children: ReactNode
  className?: string
}) => JSX.Element) & {
  Head: typeof Head
  Body: typeof Body
  Row: typeof Row
  HeadCell: typeof HeadCell
  BodyCell: typeof BodyCell
} = ({ children, className }) => (
  <StyledTable className={className}>{children}</StyledTable>
)

const StyledHead = styled.thead`
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.borderWeak};
`

export const Head = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => <StyledHead className={className}>{children}</StyledHead>

const StyledRow = styled.tr`
  color: ${({ theme }) => theme.colors.neutral.text};

  a {
    color: inherit;
  }

  [data-visibility='hover'] {
    transition: opacity 150ms;
    opacity: 0;
    pointer-events: none;
    visibility: hidden;
  }

  &:hover [data-visibility='hover'] {
    opacity: 1;
    pointer-events: auto;
    visibility: visible;
  }
`

export const Row = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => <StyledRow className={className}>{children}</StyledRow>

const StyledHeadCell = styled('th', {
  shouldForwardProp: prop => !['width'].includes(prop),
})<
  { width?: string } & Pick<
    React.HTMLProps<HTMLTableCellElement>,
    'rowSpan' | 'colSpan'
  >
>`
  ${({ width }) => (width ? `width: ${width};` : '')}
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.neutral.textWeak};
  text-align: left;
  ${({ theme }) => sharedCellStyle(theme)};
`
export const HeadCell = ({
  children,
  colSpan,
  rowSpan,
  className,
  width,
}: { children?: ReactNode; className?: string; width?: string } & Pick<
  React.HTMLProps<HTMLTableCellElement>,
  'rowSpan' | 'colSpan'
>) => (
  <StyledHeadCell
    className={className}
    colSpan={colSpan}
    rowSpan={rowSpan}
    width={width}
  >
    {children}
  </StyledHeadCell>
)

const StyledBodyCell = styled.td`
  overflow: hidden;
  white-space: nowrap;
  ${({ theme }) => sharedCellStyle(theme)};
`

export const BodyCell = ({
  children,
  colSpan,
  rowSpan,
  className,
}: { children?: ReactNode; className?: string } & Pick<
  React.HTMLProps<HTMLTableCellElement>,
  'rowSpan' | 'colSpan'
>) => (
  <StyledBodyCell className={className} colSpan={colSpan} rowSpan={rowSpan}>
    {children}
  </StyledBodyCell>
)

const StyledLoadingRow = styled(Row)`
  cursor: progress;
`

const StyledSkeleton = styled(Skeleton)`
  display: flex;
  height: ${({ theme }) => theme.typography.bodySmall.lineHeight};
  align-items: center;
`

const BodyLoader = ({
  colSpan,
  rows = 5,
}: {
  colSpan: number
  rows?: number
}) => {
  const rowArray = Array.from({ length: rows }, (_, index) => index)
  const colArray = Array.from({ length: colSpan }, (_, index) => index)

  return (
    <>
      {rowArray.map(index => (
        <StyledLoadingRow key={index}>
          {colArray.map(columnIndex => (
            <BodyCell key={columnIndex}>
              <StyledSkeleton variant="line" />
            </BodyCell>
          ))}
        </StyledLoadingRow>
      ))}
    </>
  )
}

const StyledTBody = styled.tbody`
  &[data-striped='true'] ${StyledRow}:nth-of-type(even) {
    background-color: ${({ theme }) => theme.colors.neutral.backgroundStrong};
  }
`

export const Body = ({
  loading = false,
  striped = false,
  colSpan = 1,
  children,
  className,
}: {
  /**
   * If true, the table will show a loading state with loading cursor
   */
  loading?: boolean
  colSpan?: number
  children: ReactNode
  className?: string
  /**
   * If true, the table will have a striped background every second row
   */
  striped?: boolean
}) => (
  <StyledTBody className={className} data-striped={striped}>
    {loading ? <BodyLoader colSpan={colSpan} /> : children}
  </StyledTBody>
)

// Export
Table.Head = Head
Table.Body = Body
Table.Row = Row
Table.HeadCell = HeadCell
Table.BodyCell = BodyCell
