import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ReactNode } from 'react'
import Box, { BoxProps } from '../Box'
import Loader from '../Loader'

const StyledTable = styled(Box.withComponent('table'))`
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
`

const Table: ((props: BoxProps) => JSX.Element) & {
  Head: typeof Head
  Body: typeof Body
  Row: typeof Row
  HeadCell: typeof HeadCell
  BodyCell: typeof BodyCell
} = props => <StyledTable {...props} />

const StyledHead = styled(Box.withComponent('thead'))`
  border: 0;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.neutral.borderWeak};
  border-style: solid;
`

export const Head = (props: BoxProps) => <StyledHead {...props} />

const StyledRow = styled(Box.withComponent('tr'), {
  shouldForwardProp: prop => prop !== 'highlight',
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

type RowProps = {
  highlight?: boolean
} & BoxProps

export const Row = (props: RowProps) => <StyledRow {...props} />

const cellStyle = css`
  padding: 12px 16px;
  font-size: 14px;
  line-height: 24px;
`

const StyledHeadCell = styled(Box.withComponent('th'))`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.neutral.textWeak};
  text-align: left;
  ${cellStyle};
`

export const HeadCell = (props: BoxProps) => <StyledHeadCell {...props} />

const StyledBodyCell = styled(Box.withComponent('td'))`
  overflow: hidden;
  white-space: nowrap;
  ${cellStyle};
`

export const BodyCell = (props: BoxProps) => <StyledBodyCell {...props} />

const TBody = Box.withComponent('tbody')

const StyledBox = styled(Box)`
  position: absolute;
  top: 16px;
  left: 50%;
`

const BodyLoader = (props: BoxProps & BodyProps) => (
  <TBody>
    <Row>
      <BodyCell height={80} position="relative" {...props}>
        <StyledBox>
          <Loader active size={40} />
        </StyledBox>
      </BodyCell>
    </Row>
  </TBody>
)

type BodyProps = {
  loading?: boolean
  colSpan?: number
}

export const Body = ({
  loading = false,
  colSpan = 1,
  children,
  ...props
}: BodyProps & { children: ReactNode }) =>
  loading ? (
    <BodyLoader colSpan={colSpan} />
  ) : (
    <TBody {...props}>{children}</TBody>
  )

Table.Head = Head
Table.Body = Body
Table.Row = Row
Table.HeadCell = HeadCell
Table.BodyCell = BodyCell

export default Table
