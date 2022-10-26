import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ReactNode } from 'react'
import Loader from '../Loader'

// Common
const cellStyle = css`
  padding: 12px 16px;
  font-size: 14px;
  line-height: 24px;
`

// Table Head
const StyledTable = styled.table`
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
`

const Table: ((props: {
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

// Table Head
const StyledHead = styled.thead`
  border: 0;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.neutral.borderWeak};
  border-style: solid;
`

export const Head = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => <StyledHead className={className}>{children}</StyledHead>

// Table Row
const StyledRow = styled('tr', {
  shouldForwardProp: prop => !['highlight'].includes(prop),
})<{ highlight?: boolean }>`
  color: ${({ theme }) => theme.colors.neutral.text};

  a {
    color: inherit;
  }

  tr:nth-of-type(even) {
    background-color: ${({ theme }) => theme.colors.neutral.backgroundWeak};
  }

  ${({ highlight = true, theme }) =>
    highlight &&
    css`
      &:hover {
        color: ${theme.colors.primary.text};

        td:first-of-type {
          font-weight: 500;
          text-decoration: underline;
        }
      }
    `}

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
  highlight,
  children,
  className,
}: {
  highlight?: boolean
  children: ReactNode
  className?: string
}) => (
  <StyledRow className={className} highlight={highlight}>
    {children}
  </StyledRow>
)

// Table Head  Cell
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
  ${cellStyle};
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

// Table Body Cell
const StyledBodyCell = styled.td`
  overflow: hidden;
  white-space: nowrap;
  ${cellStyle};
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

// Table Body
const LoaderBodyCell = styled(BodyCell)`
  text-align: center;
  padding-top: 25px;
`

const BodyLoader = ({ colSpan }: { colSpan: number }) => (
  <Row>
    <LoaderBodyCell colSpan={colSpan}>
      <Loader active size={40} />
    </LoaderBodyCell>
  </Row>
)

export const Body = ({
  loading = false,
  colSpan = 1,
  children,
  className,
}: {
  loading?: boolean
  colSpan?: number
  children: ReactNode
  className?: string
}) => (
  <tbody className={className}>
    {loading ? <BodyLoader colSpan={colSpan} /> : children}
  </tbody>
)

// Export
Table.Head = Head
Table.Body = Body
Table.Row = Row
Table.HeadCell = HeadCell
Table.BodyCell = BodyCell

export default Table
