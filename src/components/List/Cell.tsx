import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { FunctionComponent } from 'react'
import Box, { BoxProps } from '../Box'
import { useListContext } from './context'
import { ListColumn } from './types'

const StyledCell = styled(Box, {
  shouldForwardProp: prop =>
    !['multiselect', 'columns'].includes(prop.toString()),
})`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  text-overflow: ellipsis;

  ${({
    columns,
    multiselect,
  }: {
    columns: ListColumn<Record<string, unknown>>[]
    multiselect?: boolean
  }) =>
    columns.map(
      (column, index) =>
        `&:nth-of-type(${index + (multiselect ? 2 : 1)}) {
              align-items: ${column.alignItems ?? 'center'};
              ${column.width ? `width :${column.width};` : 'flex : 1;'}
              ${column.padding ? `padding: ${column.padding};` : ''}
              ${
                column.justifyContent
                  ? `justify-content: ${column.justifyContent};`
                  : ''
              }}`,
    )}
`

const Cell: FunctionComponent<BoxProps> = ({ children, ...props }) => {
  const { columns, multiselect } = useListContext()

  return (
    <StyledCell {...props} columns={columns} multiselect={multiselect}>
      {children}
    </StyledCell>
  )
}

Cell.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Cell
