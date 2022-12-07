import { Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import { KeyboardEvent, MouseEvent, useCallback } from 'react'
import * as animations from '../../../utils/animations'
import Box from '../../Box'
import Checkbox from '../../Checkbox'
import Tooltip from '../../Tooltip'
import BaseCell from '../Cell'
import SortIcon from '../SortIcon'
import { useListContext } from '../context'
import { ListRowProps } from '../types'

export const Cell = styled(BaseCell)``

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

const getRowColor = ({
  disabled,
  highlighted,
  selected,
  theme,
}: {
  disabled?: boolean
  highlighted?: boolean
  selected?: boolean
  theme: Theme
}) => {
  if (disabled) return theme.colors.neutral.text
  if (selected && highlighted) return theme.colors.primary.text

  return theme.colors.neutral.text
}

type StyledRowProps = {
  animated?: boolean
  animation: keyof typeof animations
  animationDuration: number
  disabled?: boolean
  highlighted?: boolean
}

const StyledRow = styled(Box, {
  shouldForwardProp: prop =>
    ![
      'animated',
      'animation',
      'animationDuration',
      'disabled',
      'selected',
      'highlighted',
      'isEditable',
      'isHoverable',
      'edition',
      'customStyle',
    ].includes(prop),
})<StyledRowProps>`
  ${({ animated, animationDuration, animation }) =>
    animated
      ? css`
          animation: ${animations[animation]} ${animationDuration}ms linear;
        `
      : ''}
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  &:nth-of-type(even) {
    background-color: ${({ theme }) => theme.colors.neutral.backgroundStrong};
  }

  color: ${getRowColor};

  &:hover {
    color: ${({ disabled, theme }) =>
      disabled ? theme.colors.neutral.textStrong : theme.colors.primary.text};
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

const StyledCheckbox = styled(Checkbox)<{ disabled?: boolean }>`
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
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
      {columns.map(({ sort, label, width }, index) => (
        <Cell
          key={label ?? index}
          role="button"
          tabIndex={label ? 0 : undefined}
          aria-label={`sort ${label ?? index}`}
          disabled={isLoading}
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

export const Row = ({
  id,
  children,
  animated,
  animation = 'fadeIn',
  animationDuration = 1000,
  disabled = false,
  tooltip,
  open = false,
  ...props
}: ListRowProps) => {
  const {
    multiselect,
    rowsState,
    setRowState,
    hasSelectedItems,
    selectableItems,
    notSelectableText,
  } = useListContext()
  const { selected = false, highlighted = false } = rowsState[id] || {}

  const isSelectable = !!selectableItems[id as keyof typeof selectableItems]

  return (
    <Tooltip key={id} text={tooltip}>
      <StyledRow
        {...props}
        open={open}
        role="listitem"
        disabled={disabled}
        animated={animated}
        animation={animation}
        animationDuration={animationDuration}
        selected={selected}
        highlighted={highlighted}
        data-testid={`row-${id}`}
      >
        {multiselect && (
          <div>
            <Tooltip
              id={`list-tooltip-row-${id}`}
              text={!isSelectable ? notSelectableText : undefined}
            >
              <StyledCheckbox
                value={id}
                name="select-rows"
                data-visibility={hasSelectedItems ? '' : 'hover'}
                checked={selected}
                disabled={!isSelectable}
                size={20}
                aria-label="select-rows"
                onChange={() => setRowState(id, { selected: !selected })}
              />
            </Tooltip>
          </div>
        )}
        {children}
      </StyledRow>
    </Tooltip>
  )
}
