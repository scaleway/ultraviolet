import { Theme, css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, {
  FunctionComponent,
  KeyboardEvent,
  MouseEvent,
  useCallback,
} from 'react'
import { ColorDeprecated as Color } from '../../theme/deprecated/colors'
import Box from '../Box'
import Checkbox from '../Checkbox'
import Tooltip from '../Tooltip'
import BaseCell from './Cell'
import SortIcon from './SortIcon'
import { useListContext } from './context'
import { ListRowProps } from './types'

export const Cell = styled(BaseCell)``

const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }

  100% {
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
  if (disabled) return theme.colorsDeprecated.gray550
  if (selected && highlighted) return theme.colorsDeprecated.primary

  return theme.colorsDeprecated.gray700
}

const StyledRow = styled(Box, {
  shouldForwardProp: prop =>
    ![
      'animated',
      'disabled',
      'selected',
      'highlighted',
      'locked',
      'isEditable',
      'isHoverable',
      'edition',
      'customStyle',
    ].includes(prop.toString()),
})<{ animated?: boolean; disabled?: boolean; highlighted?: boolean }>`
  ${({ animated }) =>
    animated
      ? css`
          animation: ${fadeInAnimation} 1s linear;
        `
      : ``}
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  &:nth-of-type(even) {
    background-color: ${({ theme }) => theme.colorsDeprecated.gray50};
  }

  color: ${getRowColor};

  &:hover {
    color: ${({ disabled, theme }) =>
      disabled
        ? theme.colorsDeprecated.gray550
        : theme.colorsDeprecated.primary};
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

const StyledSpan = styled.span<{ color?: Color }>`
  ${({ theme, color }) =>
    color ? `color: ${theme.colorsDeprecated[color]};` : ``}
`

export const Header: FunctionComponent = () => {
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
  }, [hasAllSelected, unselectAll, selectAll])

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
  animated,
  disabled,
  tooltip,
  ...props
}) => {
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
        selected={selected}
        highlighted={highlighted}
        data-testid={`row-${id}`}
      >
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
        {children}
      </StyledRow>
    </Tooltip>
  )
}

Row.propTypes = {
  alert: PropTypes.bool,
  animated: PropTypes.bool,
  children: PropTypes.node.isRequired,
  customStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  disabled: PropTypes.bool,
  edition: PropTypes.bool,
  id: PropTypes.string.isRequired,
  isEditable: PropTypes.bool,
  isHoverable: PropTypes.bool,
  locked: PropTypes.bool,
  onClick: PropTypes.func,
  open: PropTypes.bool,
  tooltip: PropTypes.string,
}

Row.defaultProps = {
  alert: undefined,
  animated: undefined,
  customStyle: undefined,
  disabled: false,
  edition: false,
  isEditable: false,
  isHoverable: false,
  locked: false,
  onClick: undefined,
  open: false,
  tooltip: undefined,
}
