import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import Box from '../Box'
import { useListContext } from './context'

const StyledCell = styled(Box, {
  shouldForwardProp: prop => !['multiselect', 'columns'].includes(prop),
})`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  text-overflow: ellipsis;

  ${({ columns, multiselect }) =>
    columns.map(
      (column, index) =>
        `&:nth-of-type(${index + (multiselect ? 2 : 1)}) {
              align-items: ${column.alignItems || 'center'};
              ${column.width ? `width :${column.width};` : 'flex : 1;'}
              ${column.padding ? `padding: ${column.padding};` : ''}
              ${
                column.justifyContent
                  ? `justify-content: ${column.justifyContent};`
                  : ''
              }}`,
    )}
`

const Cell = ({ children, ...props }) => {
  const { columns, multiselect } = useListContext()

  return (
    <StyledCell columns={columns} multiselect={multiselect} {...props}>
      {children}
    </StyledCell>
  )
}

Cell.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Cell
