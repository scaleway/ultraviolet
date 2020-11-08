import { css } from '@emotion/core'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import { theme } from '../../theme'
import { ActivityIndicator } from '../ActivityIndicator'
import { Box } from '../Box'

const Table = styled.table`
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
`

const Head = styled.thead`
  border: 0;
  border-bottom-width: 1px;
  border-color: ${theme.gray350};
  border-style: solid;
`

const Row = styled.tr`
  color: ${theme.gray700};

  a {
    color: inherit;
  }

  tr:nth-of-type(even) {
    background-color: ${theme.gray50};
  }

  ${({ highlight }) =>
    highlight &&
    `
    &:hover {
      color: ${theme.primary};

      td:first-of-type {
        font-weight: 500;
        text-decoration: underline;
      }
    }`}

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

Row.propTypes = {
  highlight: PropTypes.bool,
}

Row.defaultProps = {
  highlight: true,
}

const cellStyle = css`
  padding: 12px 16px;
  font-size: 14px;
  line-height: 24px;
`

const HeadCell = styled.th`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 400;
  color: ${theme.gray550};
  text-align: left;
  ${cellStyle};
`

const BodyCell = styled.td`
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  ${cellStyle};
`

const TBody = Box.withComponent('tbody')

const BodyLoader = props => (
  <TBody>
    <Row>
      <BodyCell height={80} {...props}>
        <ActivityIndicator position="absolute" top={16} left="50%" size={40} />
      </BodyCell>
    </Row>
  </TBody>
)

const Body = ({ loading, colSpan, ...props }) =>
  loading ? <BodyLoader colSpan={colSpan} /> : <TBody {...props} />

Body.propTypes = {
  loading: PropTypes.bool,
  colSpan: PropTypes.number,
}

Body.defaultProps = {
  loading: false,
  colSpan: 1,
}

Table.Head = Head
Table.Body = Body
Table.Row = Row
Table.HeadCell = HeadCell
Table.BodyCell = BodyCell

export { Table }
