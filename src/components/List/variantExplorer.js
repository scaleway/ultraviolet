import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { memo, useCallback } from 'react'
import Box from '../Box'
import Checkbox from '../Checkbox'
import Tooltip from '../Tooltip'
import BaseCell from './Cell'
import SortIcon from './SortIcon'
import { useListContext } from './context'

export const Cell = styled(BaseCell)``
const StyledRow = styled(Box, {
  shouldForwardProp: prop => !['selected', 'highlighted'].includes(prop),
})`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray350};

  color: ${({ selected, highlighted, theme }) =>
    selected && highlighted ? theme.colors.primary : theme.colors.gray700};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  ${Cell} {
    font-size: 14px;
    padding: 4px 8px !important;
    height: 48px;
  }

  [data-visibility='hover'] {
    opacity: 0;
  }
  &:hover [data-visibility='hover'] {
    opacity: 1;
  }
`

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray350};

  ${Cell} {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray550};
    padding: 4px 8px !important;

    &[disabled] {
      pointer-events: none;
    }
  }
`

const StyledCheckbox = styled(Checkbox)`
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
`

export const Header = () => {
  const {
    columns,
    isLoading,
    sortOrder,
    sortedIndex,
    onSort,
    multiselect,
    selectAll,
    unselectAll,
    hasAllSelected,
  } = useListContext()

  const onSortEvent = useCallback(
    (event, sort, index) => {
      event.preventDefault()
      if (sort) {
        onSort(index)
      }
    },
    [onSort],
  )

  return (
    <StyledHeader>
      {multiselect && (
        <StyledCheckbox
          name="select-rows"
          value="all"
          checked={hasAllSelected}
          size={20}
          disabled={isLoading}
          onChange={() => {
            if (hasAllSelected) {
              unselectAll()
            } else {
              selectAll()
            }
          }}
        />
      )}
      {columns.map(({ label, sort, width }, index) => (
        <Cell
          key={label ?? index}
          role="button"
          aria-label={`sort ${label ?? index}`}
          tabIndex={label ? 0 : undefined}
          disabled={isLoading}
          onClick={e => (label ? onSortEvent(e, sort, index) : undefined)}
          onKeyPress={e => onSortEvent(e, sort, index)}
          style={{
            cursor: sort ? 'pointer' : 'default',
            width,
          }}
        >
          <Box as="span" color={sortedIndex === index ? 'primary' : undefined}>
            {label}
          </Box>
          {sort && (
            <SortIcon active={sortedIndex === index} order={sortOrder} />
          )}
        </Cell>
      ))}
    </StyledHeader>
  )
}

export const Row = memo(({ id, children, tooltip, ...props }) => {
  const { multiselect, rowsState, setRowState, hasSelectedItems } =
    useListContext()

  const { selected = false, highlighted = false } = rowsState[id] || {}

  return (
    <Tooltip baseId={`list-tooltip-row-${id}`} text={tooltip}>
      <StyledRow
        {...props}
        role="listitem"
        data-testid={`row-${id}`}
        selected={selected}
        highlighted={highlighted}
      >
        {multiselect && (
          <StyledCheckbox
            data-visibility={hasSelectedItems ? '' : 'hover'}
            checked={selected}
            size={20}
            value={id}
            name="select-rows"
            onChange={() => {
              setRowState(id, { selected: !selected })
            }}
          />
        )}
        {children}
      </StyledRow>
    </Tooltip>
  )
})

Row.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  tooltip: PropTypes.string,
}

Row.defaultProps = {
  id: undefined,
  tooltip: undefined,
}
