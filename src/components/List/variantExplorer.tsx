import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, {
  FunctionComponent,
  KeyboardEvent,
  MouseEvent,
  VoidFunctionComponent,
  useCallback,
} from 'react'
import { Color } from '../../theme/colors'
import Box from '../Box'
import Checkbox from '../Checkbox'
import Tooltip from '../Tooltip'
import BaseCell from './Cell'
import SortIcon from './SortIcon'
import { useListContext } from './context'
import { ListRowProps } from './types'

export const Cell = styled(BaseCell)``
const StyledRow = styled(Box, {
  shouldForwardProp: prop =>
    !['selected', 'highlighted'].includes(prop.toString()),
})<{ selected?: boolean; highlighted?: boolean }>`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  border-bottom: 1px solid ${({ theme }) => theme.colorsDeprecated.gray350};

  color: ${({ selected, highlighted, theme }) =>
    selected && highlighted
      ? theme.colorsDeprecated.primary
      : theme.colorsDeprecated.gray700};

  &:hover {
    color: ${({ theme }) => theme.colorsDeprecated.primary};
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
  border-bottom: 1px solid ${({ theme }) => theme.colorsDeprecated.gray350};

  ${Cell} {
    font-size: 14px;
    color: ${({ theme }) => theme.colorsDeprecated.gray550};
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

const StyledSpan = styled.span<{ color?: Color }>`
  ${({ theme, color }) =>
    color ? `color: ${theme.colorsDeprecated[color]};` : ``}
`

export const Header: VoidFunctionComponent = () => {
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
    (event: MouseEvent | KeyboardEvent, sort, index: number) => {
      event.preventDefault()
      if (sort) {
        onSort(index)
      }
    },
    [onSort],
  )

  const handleSelectAll = useCallback(() => {
    if (hasAllSelected) {
      unselectAll()
    } else {
      selectAll()
    }
  }, [hasAllSelected, selectAll, unselectAll])

  return (
    <StyledHeader>
      {multiselect ? (
        <StyledCheckbox
          name="select-rows"
          value="all"
          checked={hasAllSelected}
          size={20}
          disabled={isLoading}
          onChange={handleSelectAll}
        />
      ) : null}
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
            width: width ?? undefined,
          }}
        >
          <StyledSpan color={sortedIndex === index ? 'primary' : undefined}>
            {label}
          </StyledSpan>
          {sort ? (
            <SortIcon active={sortedIndex === index} order={sortOrder} />
          ) : null}
        </Cell>
      ))}
    </StyledHeader>
  )
}

export const Row: FunctionComponent<ListRowProps> = ({
  id,
  children,
  tooltip,
  ...props
}) => {
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
        {multiselect ? (
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
        ) : null}
        {children}
      </StyledRow>
    </Tooltip>
  )
}

Row.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
}

Row.defaultProps = {
  tooltip: undefined,
}
