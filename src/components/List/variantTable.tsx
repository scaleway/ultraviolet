import { Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { KeyboardEvent, MouseEvent, useCallback } from 'react'
import * as animations from '../../utils/animations'
import Box from '../Box'
import Checkbox from '../Checkbox'
import Tooltip from '../Tooltip'
import BaseCell from './Cell'
import SortIcon from './SortIcon'
import { useListContext } from './context'
import { ListRowProps } from './types'

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
    ].includes(prop.toString()),
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

const StyledCheckbox = styled(Checkbox)`
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
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
    (event: MouseEvent | KeyboardEvent, sort, index: number) => {
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
          onClick={e => (label ? onSortEvent(e, sort, index) : undefined)}
          onKeyPress={e => onSortEvent(e, sort, index)}
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
  disabled,
  tooltip,
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
        role="listitem"
        disabled={disabled}
        animated={animated}
        animation={animation}
        animationDuration={animationDuration}
        selected={selected}
        highlighted={highlighted}
        data-testid={`row-${id}`}
      >
        <div>
          {multiselect && (
            <Tooltip
              baseId={`list-tooltip-row-${id}`}
              text={!isSelectable ? notSelectableText : undefined}
            >
              <StyledCheckbox
                value={id}
                name="select-rows"
                data-visibility={hasSelectedItems ? '' : 'hover'}
                checked={selected}
                disabled={!isSelectable}
                size={20}
                onChange={() => setRowState(id, { selected: !selected })}
              />
            </Tooltip>
          )}
        </div>
        {children}
      </StyledRow>
    </Tooltip>
  )
}

Row.propTypes = {
  animated: PropTypes.bool,
  animation: PropTypes.oneOf<ListRowProps['animation']>(
    Object.keys(animations) as ListRowProps['animation'][],
  ),
  animationDuration: PropTypes.number,
  children: PropTypes.node.isRequired,
  customStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  disabled: PropTypes.bool,
  edition: PropTypes.bool,
  id: PropTypes.string.isRequired,
  isEditable: PropTypes.bool,
  isHoverable: PropTypes.bool,
  onClick: PropTypes.func,
  open: PropTypes.bool,
  tooltip: PropTypes.string,
}

Row.defaultProps = {
  animated: undefined,
  customStyle: undefined,
  disabled: false,
  edition: false,
  isEditable: false,
  isHoverable: false,
  onClick: undefined,
  open: false,
  tooltip: undefined,
}
