import { Theme, css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, {
  ChangeEvent,
  FunctionComponent,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  isValidElement,
  useCallback,
} from 'react'
import * as animations from '../../utils/animations'
import Checkbox from '../Checkbox'
import Tooltip from '../Tooltip'
import BaseCell from './Cell'
import SortIcon from './SortIcon'
import { useListContext } from './context'
import { ListRowProps, ListRowState } from './types'

export const BORDER_THICKNESS = 1

const getBorderColor = ({
  alert,
  highlighted,
  selected,
  theme,
}: {
  alert?: boolean
  highlighted?: boolean
  selected?: boolean
  theme: Theme
}) => {
  if (alert) return theme.colors.warning.border
  if (selected || highlighted) return theme.colors.primary.border

  return theme.colors.neutral.borderWeak
}

export const Cell = styled(BaseCell)``

const StyledExpendableContainer = styled('div', {
  shouldForwardProp: prop => !['multiselect'].includes(prop.toString()),
})<{ multiselect?: boolean }>`
  flex: 0 0 100%;

  [data-expandable] {
    border-top: 1px solid ${({ theme }) => theme.colors.neutral.borderWeak};
    padding: 16px 16px 8px ${({ multiselect }) => (multiselect ? 48 : 16)}px;
    margin-top: 8px;

    > * + * {
      margin: 16px 0;
    }

    > *:last-child {
      margin: 0;
    }
  }
`

const StyledRow = styled('details', {
  shouldForwardProp: prop =>
    ![
      'animated',
      'openable',
      'alert',
      'highlighted',
      'isHoverable',
      'multiselect',
      'id',
      'as',
    ].includes(prop.toString()),
})<
  Partial<ListRowProps> & {
    openable?: boolean
    highlighted?: boolean
    multiselect?: boolean
  }
>`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  ${({ animated, animationDuration, animation }) =>
    animated
      ? css`
          animation: ${(
              animations as Record<string, ReturnType<typeof keyframes>>
            )[animation as string]}
            ${animationDuration as number}ms linear;
        `
      : ''}

  border: ${BORDER_THICKNESS}px solid ${getBorderColor};
  border-radius: 4px;
  margin-bottom: 16px;
  padding: 8px 0;
  transition: box-shadow 200ms ease, border-color 200ms ease;
  background-color: ${({ alert, theme }) =>
    alert ? theme.colors.warning.background : theme.colors.neutral.background};

  cursor: ${({ openable }) => (openable ? 'pointer' : 'auto')};
  color: ${({ alert, theme }) =>
    alert ? theme.colors.warning.text : 'inherit'};

  ${({ highlighted, isHoverable, theme }) =>
    isHoverable
      ? `&:hover${highlighted ? ', &' : ''} {
        border-color: ${theme.colors.primary.border};
        box-shadow: ${theme.shadows.hoverPrimary};
      }`
      : ''}

  [data-visibility='hover'] {
    opacity: 0;
  }
  &:hover [data-visibility='hover'] {
    opacity: 1;
  }

  ${Cell} {
    padding: 0 8px;
    min-height: 48px;
    font-size: 14px;

    &:first-of-type {
      padding-left: ${({ multiselect }) => (multiselect ? 0 : 16)}px;
    }
  }
`

const StyledCheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px ${({ theme }) => theme.space[1]};
`

const StyledContainerSummary = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

const StyledHeader = styled('div', {
  shouldForwardProp: prop => !['multiselect'].includes(prop.toString()),
})<{ multiselect?: boolean }>`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 ${BORDER_THICKNESS}px;

  > ${Cell} {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.neutral.textWeak};
    height: 40px;

    padding: 0 8px;

    &:first-of-type {
      padding-left: ${({ multiselect }) => (multiselect ? 0 : 16)}px;
    }

    &[disabled] {
      pointer-events: none;
    }
  }
`

const StyledSummary = styled.summary`
  width: 100%;
  list-style-type: none;
  &::before,
  &::after {
    content: none;
  }
  &::-webkit-details-marker {
    display: none;
  }
  &::-marker {
    display: none;
  }
`

const StyledSpan = styled.span<{ isPrimaryColor?: boolean }>`
  text-overflow: ellipsis;
  overflow: hidden;
  ${({ theme, isPrimaryColor }) =>
    isPrimaryColor ? `color: ${theme.colors.primary.text};` : ``}
`

export const Header: FunctionComponent = props => {
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

  return (
    <StyledHeader multiselect={multiselect} {...props}>
      {multiselect && (
        <StyledCheckboxContainer>
          <Checkbox
            display="flex"
            justifyContent="center"
            alignItems="center"
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
        </StyledCheckboxContainer>
      )}
      {columns.map(({ label, sort, width }, index) => (
        <Cell
          key={label ?? index}
          role="button"
          tabIndex={label ? 0 : undefined}
          aria-label={`sort ${label ?? index}`}
          disabled={isLoading}
          onClick={e => (label ? onSortEvent(e, sort, index) : undefined)}
          onKeyPress={e => onSortEvent(e, sort, index)}
          style={{
            alignItems: 'center',
            cursor: sort ? 'pointer' : 'default',
            width: width ?? undefined,
          }}
        >
          <StyledSpan isPrimaryColor={sortedIndex === index}>
            {label}
          </StyledSpan>
          {sort && (
            <SortIcon active={sortedIndex === index} order={sortOrder} />
          )}
        </Cell>
      ))}
    </StyledHeader>
  )
}

type ExpandedContentProps = {
  id?: string
  rowsState?: { [x: string]: ListRowState }
  children?:
    | ReactNode
    | ((props: { id?: string; isToggled: boolean }) => Element)
}

export const ExpendableContent: FunctionComponent<ExpandedContentProps> = ({
  children,
  id,
  rowsState,
}) => (
  <div data-expandable>
    {typeof children === 'function'
      ? children({
          id,
          isToggled: rowsState?.[id as keyof typeof rowsState]?.opened || false,
        })
      : children}
  </div>
)

ExpendableContent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  id: PropTypes.string,
  rowsState: PropTypes.shape({}),
}

export const Row: FunctionComponent<ListRowProps> = ({
  id,
  children,
  animated = false,
  animation = 'fadeIn',
  animationDuration = 1000,
  edition = false,
  isEditable = false,
  isHoverable = true,
  locked = false,
  alert,
  customStyle,
  open = false,
  expandableClassName,
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

  const {
    selected = edition || false,
    forceOpened = false,
    opened = open,
    highlighted = false,
  } = rowsState[id] || {}

  const finalChildren = React.Children.toArray(children).map(child =>
    isValidElement(child) && child.type === ExpendableContent
      ? React.cloneElement(child, {
          id,
          isToggled: forceOpened || opened,
          rowsState,
        })
      : child,
  )

  const expandable = !!finalChildren.find(
    child => isValidElement(child) && child.type === ExpendableContent,
  )

  const isSelectable = !!selectableItems[id as keyof typeof selectableItems]

  const expendableContent = finalChildren.map(
    child => isValidElement(child) && child.type === ExpendableContent && child,
  )
  const content = finalChildren.map(
    child => isValidElement(child) && child.type !== ExpendableContent && child,
  )

  const handleToggle = (event: MouseEvent<HTMLElement>) => {
    setRowState(id, {
      opened: (event.target as HTMLDetailsElement).open,
    } as ListRowState)
  }

  const hasExpandableContent = expendableContent.find(
    localContent => localContent,
  )

  const CustomDetails = hasExpandableContent ? 'details' : 'div'
  const CustomSummary = hasExpandableContent ? 'summary' : 'div'

  return (
    <StyledRow
      role="listitem"
      animated={animated}
      animation={animation}
      animationDuration={animationDuration}
      id={id}
      open={expendableContent && (forceOpened || opened)}
      isHoverable={isHoverable && !isEditable && !alert}
      openable={expandable && !forceOpened}
      highlighted={highlighted}
      multiselect={multiselect}
      alert={alert}
      css={customStyle}
      as={CustomDetails}
      data-testid={`row-${id}`}
      onToggle={handleToggle}
    >
      <StyledSummary as={CustomSummary}>
        <StyledContainerSummary {...props}>
          {multiselect && (
            <StyledCheckboxContainer>
              {!locked && (
                <Tooltip
                  baseId={`list-tooltip-row-${id}`}
                  text={!isSelectable ? notSelectableText : undefined}
                >
                  <Checkbox
                    value={id}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    data-visibility={hasSelectedItems ? '' : 'hover'}
                    checked={selected}
                    disabled={!isSelectable}
                    size={20}
                    name="select-rows"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setRowState(id, { selected: e.target.checked })
                    }
                  />
                </Tooltip>
              )}
            </StyledCheckboxContainer>
          )}
          {content}
        </StyledContainerSummary>
      </StyledSummary>
      <StyledExpendableContainer
        multiselect={multiselect}
        css={expandableClassName}
      >
        {expendableContent}
      </StyledExpendableContainer>
    </StyledRow>
  )
}

Row.propTypes = {
  alert: PropTypes.bool,
  animated: PropTypes.bool,
  animation: PropTypes.oneOf<ListRowProps['animation']>(
    Object.keys(animations) as ListRowProps['animation'][],
  ),
  animationDuration: PropTypes.number,
  children: PropTypes.node.isRequired,
  customStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  edition: PropTypes.bool,
  expandableClassName: PropTypes.string,
  id: PropTypes.string.isRequired,
  isEditable: PropTypes.bool,
  isHoverable: PropTypes.bool,
  locked: PropTypes.bool,
  open: PropTypes.bool,
}
