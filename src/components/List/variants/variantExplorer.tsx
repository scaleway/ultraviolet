import styled from '@emotion/styled'
import type { KeyboardEvent, MouseEvent } from 'react'
import { useCallback } from 'react'
import Checkbox from '../../Checkbox'
import Tooltip from '../../Tooltip'
import BaseCell from '../Cell'
import SortIcon from '../SortIcon'
import { useListContext } from '../context'
import type { ListRowProps } from '../types'

export const Cell = styled(BaseCell)``
const StyledRow = styled('div', {
  shouldForwardProp: prop => !['selected', 'highlighted'].includes(prop),
})<{ selected?: boolean; highlighted?: boolean }>`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.borderWeak};
  background: ${({ theme }) => theme.colors.neutral.background};

  color: ${({ selected, highlighted, theme }) =>
    selected && highlighted
      ? theme.colors.primary.textWeak
      : theme.colors.neutral.text};

  &:hover {
    color: ${({ theme }) => theme.colors.primary.textWeakHover};
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
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.borderWeak};

  ${Cell} {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.neutral.textWeak};
    padding: 4px 8px !important;

    &[disabled] {
      pointer-events: none;
    }
  }
`

const StyledCheckbox = styled(Checkbox)<{ disabled?: boolean }>`
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  ${({ disabled }) => (disabled ? 'pointer-events: none;' : '')};
`

const StyledSpan = styled.span<{ isPrimaryColor?: boolean }>`
  ${({ theme, isPrimaryColor }) =>
    isPrimaryColor ? `color: ${theme.colors.primary.text};` : ``}
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
    hasSelectedItems,
  } = useListContext()

  const onSortEvent = useCallback(
    (
      event: MouseEvent | KeyboardEvent,
      index: number,
      sort?: string | ((item: Record<string, unknown>) => string) | null,
    ) => {
      event.preventDefault()
      if (sort) {
        onSort(index)
      }
    },
    [onSort],
  )

  const handleOnChange = useCallback(() => {
    if (hasAllSelected || (hasSelectedItems && !hasAllSelected)) unselectAll()
    else selectAll()
  }, [hasAllSelected, hasSelectedItems, unselectAll, selectAll])

  return (
    <StyledHeader>
      {multiselect ? (
        <div>
          <StyledCheckbox
            name="select-rows"
            value="all"
            checked={
              hasSelectedItems && !hasAllSelected
                ? 'indeterminate'
                : hasAllSelected
            }
            size={20}
            disabled={isLoading}
            aria-label="select-rows"
            onChange={handleOnChange}
          />
        </div>
      ) : null}
      {columns.map(({ label, sort, width }, index) => (
        <Cell
          key={label ?? index}
          role="button"
          aria-label={`sort ${label ?? index}`}
          tabIndex={label ? 0 : undefined}
          onClick={event =>
            label ? onSortEvent(event, index, sort) : undefined
          }
          onKeyPress={event => onSortEvent(event, index, sort)}
          style={{
            cursor: sort ? 'pointer' : 'default',
            width: width ?? undefined,
          }}
        >
          <StyledSpan isPrimaryColor={sortedIndex === index}>
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

export const Row = ({ id, children, tooltip, className }: ListRowProps) => {
  const { multiselect, rowsState, setRowState, hasSelectedItems } =
    useListContext()

  const { selected = false, highlighted = false } = rowsState[id] || {}

  return (
    <Tooltip id={`list-tooltip-row-${id}`} text={tooltip}>
      <StyledRow
        className={className}
        role="listitem"
        data-testid={`row-${id}`}
        selected={selected}
        highlighted={highlighted}
      >
        {multiselect ? (
          <div>
            <StyledCheckbox
              data-visibility={hasSelectedItems ? '' : 'hover'}
              checked={selected}
              size={20}
              value={id}
              name="select-rows"
              aria-label="select-rows"
              onChange={() => {
                setRowState(id, { selected: !selected })
              }}
            />
          </div>
        ) : null}
        {children}
      </StyledRow>
    </Tooltip>
  )
}
