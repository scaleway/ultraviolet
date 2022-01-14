import { css } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { FunctionComponent } from 'react'
import ActivityIndicator from '../ActivityIndicator'
import Box, { BoxProps } from '../Box'

const StyledTable = styled(Box.withComponent('table'))`
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
`

const Table: FunctionComponent<BoxProps> & {
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

export const Head: FunctionComponent<BoxProps> = props => (
  <StyledHead {...props} />
)

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

export const Row: FunctionComponent<RowProps> = props => (
  <StyledRow {...props} />
)

Row.propTypes = {
  highlight: PropTypes.bool,
}

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

export const HeadCell: FunctionComponent<BoxProps> = props => (
  <StyledHeadCell {...props} />
)

const StyledBodyCell = styled(Box.withComponent('td'))`
  overflow: hidden;
  white-space: nowrap;
  ${cellStyle};
`

export const BodyCell: FunctionComponent<BoxProps> = props => (
  <StyledBodyCell {...props} />
)

const TBody = Box.withComponent('tbody')

const StyledBox = styled(Box)`
  position: absolute;
  top: 16px;
  left: 50%;
`

const BodyLoader: FunctionComponent<BoxProps & BodyProps> = props => (
  <TBody>
    <Row>
      <BodyCell height={80} position="relative" {...props}>
        <StyledBox>
          <ActivityIndicator active size={40} />
        </StyledBox>
      </BodyCell>
    </Row>
  </TBody>
)

type BodyProps = {
  loading?: boolean
  colSpan?: number
}

export const Body: FunctionComponent<BodyProps> = ({
  loading = false,
  colSpan = 1,
  ...props
}) => (loading ? <BodyLoader colSpan={colSpan} /> : <TBody {...props} />)

Body.propTypes = {
  colSpan: PropTypes.number,
  loading: PropTypes.bool,
}

Table.Head = Head
Table.Body = Body
Table.Row = Row
Table.HeadCell = HeadCell
Table.BodyCell = BodyCell

export default Table
