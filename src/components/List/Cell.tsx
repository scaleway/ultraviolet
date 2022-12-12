import styled from '@emotion/styled'
import type { HTMLAttributes } from 'react'
import { useListContext } from './context'
import type { ListColumn } from './types'

const StyledCell = styled('div', {
  shouldForwardProp: prop => !['multiselect', 'columns'].includes(prop),
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

const Cell = ({
  children,
  className,
  role,
  'aria-label': ariaLabel,
  tabIndex,
  onClick,
  onKeyPress,
  style,
}: HTMLAttributes<HTMLDivElement>) => {
  const { columns, multiselect } = useListContext()

  return (
    <StyledCell
      aria-label={ariaLabel}
      tabIndex={tabIndex}
      onClick={onClick}
      onKeyPress={onKeyPress}
      role={role}
      className={className}
      columns={columns}
      multiselect={multiselect}
      style={style}
    >
      {children}
    </StyledCell>
  )
}

export default Cell
