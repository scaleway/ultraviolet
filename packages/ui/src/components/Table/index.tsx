import type { Theme } from '@emotion/react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import { Loader } from '../Loader'

// Common
const cellStyle = (theme: Theme) => css`
  padding: ${theme.space[1]} ${theme.space[2]};
  font-size: ${theme.typography.bodySmall.fontSize};
  line-height: ${theme.typography.bodySmall.lineHeight};
`

// Table Head
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
  ${({ theme }) => cellStyle(theme)};
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
  ${({ theme }) => cellStyle(theme)};
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
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: ${({ theme }) => theme.space[2]};
`

const BodyLoader = ({ colSpan }: { colSpan: number }) => (
  <Row>
    <BodyCell colSpan={colSpan}>
      <LoaderWrapper>
        <Loader active size={40} />
      </LoaderWrapper>
    </BodyCell>
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
