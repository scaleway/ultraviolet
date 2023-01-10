import styled from '@emotion/styled'
import type { ChangeEventHandler, MouseEventHandler, ReactNode } from 'react'
import React, { isValidElement, useEffect } from 'react'
import type { Color } from '../../theme'
import { Checkbox } from '../Checkbox'
import { Icon } from '../Icon'
import { Tooltip } from '../Tooltip'
import { ListCell } from './ListCell'
import { useListContext } from './ListContext'
import { ListExpandable } from './ListExpandable'

const ArrowIcon = styled(Icon)``
const ArrowIconCell = styled(ListCell)`
  display: flex;
  align-items: center;
  cursor: pointer;
  grid-col-start: -1;
`

const StyledCheckboxContainer = styled.div`
  display: flex;
`

const StyledTooltip = styled(Tooltip)`
  display: flex;
`

const StyledCheckbox = styled(Checkbox)`
  &[aria-disabled='true'] {
    pointer-events: none;
  }
`

export const LIST_ROW_VARIANTS: Color[] = [
  'danger',
  'warning',
  'primary',
  'success',
  'neutral',
  'info',
]

const StyledRow = styled('div', {
  shouldForwardProp: prop => !['template', 'cellCount'].includes(prop),
})<{
  template: string
  cellCount: number
  'data-disabled': boolean
  'data-hoverable': boolean
  'data-highlight': boolean
  'data-variant': Color | undefined
}>`
  position: relative;
  display: grid;
  grid-template-columns: ${({ template }) => template};
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.neutral.borderWeak};
  border-radius: ${({ theme }) => theme.radii.default};
  transition: box-shadow 200ms ease, border-color 200ms ease;
  background-color: ${({ theme }) => theme.colors.neutral.background};
  cursor: auto;
  font-size: ${({ theme }) => theme.typography.bodySmall.fontSize};
  column-gap: ${({ theme }) => theme.space['1']};

  &[role='button row'] {
    cursor: pointer;
  }

  ${({ theme }) =>
    LIST_ROW_VARIANTS.map(
      color => `
    &[data-variant="${color}"] {
      color: ${theme.colors[color].text};
      border-color: ${theme.colors[color].border};
      background-color: ${theme.colors[color].background};
    }

    &[data-variant="${color}"][data-highlight="true"] {
      border-color: ${theme.colors[color].border};
      box-shadow: none;
    }

    &[data-variant="${color}"][data-hoverable='true']:hover {
      border-color: ${theme.colors[color].border};
      box-shadow: none;
    }
    `,
    ).join(' ')}

  &[data-hoverable='true']:hover, &[data-variant="neutral"][data-highlight="true"], &[data-variant="neutral"][data-hoverable='true']:hover {
    border-color: ${({ theme }) => theme.colors.primary.border};
    box-shadow: ${({ theme }) => theme.shadows.hoverPrimary};
  }

  &[data-highlight='true'] {
    border-color: ${({ theme }) => theme.colors.primary.border};
    box-shadow: ${({ theme }) => theme.shadows.hoverPrimary};
  }

  & [data-visibility='hover'] {
    opacity: 0;
  }
  &:hover [data-visibility='hover'] {
    opacity: 1;
  }

  &[data-disabled='true'] {
    border: 1px solid ${({ theme }) => theme.colors.neutral.borderDisabled};
    background-color: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
    color: ${({ theme }) => theme.colors.neutral.textDisabled};
    pointer-events: none;
  }

  & > [role='cell']:first-of-type {
    padding-left: ${({ theme }) => theme.space['1']};
  }

  & > [role='cell']:nth-child(${({ cellCount }) => cellCount}) {
    padding-right: ${({ theme }) => theme.space['1']};
  }

  & [data-expandable-content] {
    transition: max-height 500ms ease-in-out;
  }

  &:not([aria-expanded='true']) [data-expandable-content] {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    max-height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  &[aria-expanded='true'] [data-expandable-content] {
    max-height: 9999px;
  }

  & ${ArrowIcon} {
    transition: transform 250ms ease-in-out;
  }

  &[aria-expanded='true'] ${ArrowIcon} {
    transform: rotate(-180deg);
  }
`

type ListRowProps = {
  children: ReactNode
  className?: string
  isHoverable?: boolean
  isDisabled?: boolean
  isHighlighted?: boolean
  id: string
  checkboxRender?: ReactNode
  checkboxDisabled?: boolean
  checkboxTooltip?: string
  tooltip?: string
  variant?: typeof LIST_ROW_VARIANTS[number]
}

export const ListRow = ({
  children,
  className,
  isDisabled = false,
  isHoverable = true,
  isHighlighted = false,
  id,
  checkboxRender,
  variant,
  tooltip,
  checkboxTooltip,
  checkboxDisabled,
}: ListRowProps) => {
  const {
    autoClose,
    template,
    selectedIds,
    setSelectedIds,
    expandedRowIds,
    setExpandedRowIds,
    setSelectablesIds,
    showExpandArrow,
  } = useListContext()

  const isSelected = id && selectedIds ? selectedIds.includes(id) : false
  const isExpanded = expandedRowIds[id] !== undefined

  const handleExpand: MouseEventHandler<HTMLTableRowElement> = () => {
    setExpandedRowIds(current =>
      autoClose ? { [id]: !current[id] } : { ...current, [id]: !current[id] },
    )
  }

  const handleCheck: ChangeEventHandler<HTMLInputElement> = event => {
    if (!selectedIds || !setSelectedIds) {
      return
    }

    if (event.target.checked) {
      setSelectedIds([...selectedIds, event.target.value])
    } else {
      setSelectedIds(
        selectedIds.filter(selectedId => selectedId !== event.target.value),
      )
    }
  }

  // Registering selectable row
  useEffect(() => {
    if (!checkboxDisabled && setSelectedIds) {
      setSelectablesIds(currentSelectableIds => ({
        ...currentSelectableIds,
        [id]: true,
      }))

      return () => {
        setSelectablesIds(currentSelectableIds => {
          const { [id]: removedId, ...otherIds } = currentSelectableIds

          return otherIds
        })
      }
    }

    return undefined
  }, [id, checkboxDisabled, setSelectablesIds, setSelectedIds])

  const cellCount =
    React.Children.toArray(children).filter(
      child => isValidElement(child) && child.type === ListCell,
    ).length + (setSelectedIds ? 1 : 0)
  const hasOnClickExpandable =
    React.Children.toArray(children).find(
      child =>
        isValidElement<{ forceExpand?: boolean }>(child) &&
        child.type === ListExpandable &&
        child.props.forceExpand === undefined,
    ) !== undefined

  return (
    <Tooltip text={tooltip}>
      <StyledRow
        className={className}
        data-disabled={isDisabled}
        data-hoverable={hasOnClickExpandable !== undefined ? true : isHoverable}
        data-highlight={!!isHighlighted || isSelected}
        data-variant={variant}
        role={hasOnClickExpandable ? 'button row' : 'row'}
        template={showExpandArrow ? `${template} 25px` : template}
        aria-expanded={isExpanded}
        aria-haspopup={hasOnClickExpandable}
        onClick={hasOnClickExpandable && !isDisabled ? handleExpand : undefined}
        cellCount={cellCount}
      >
        {setSelectedIds ? (
          <ListCell preventClick>
            {checkboxRender ?? (
              <StyledCheckboxContainer
                data-visibility={
                  selectedIds?.length === 0 ? 'hover' : undefined
                }
              >
                <StyledTooltip text={checkboxTooltip}>
                  <StyledCheckbox
                    name="list-radio"
                    value={id}
                    checked={isSelected}
                    onChange={handleCheck}
                    disabled={isDisabled || checkboxDisabled}
                    aria-label="check"
                  />
                </StyledTooltip>
              </StyledCheckboxContainer>
            )}
          </ListCell>
        ) : null}
        {React.Children.map(children, child =>
          isValidElement<{ relatedRowId: string }>(child) &&
          child.type === ListExpandable
            ? React.cloneElement<{ relatedRowId: string }>(child, {
                ...child.props,
                relatedRowId: id,
              })
            : child,
        )}
        {showExpandArrow ? (
          <ArrowIconCell>
            <ArrowIcon name="arrow-down" />
          </ArrowIconCell>
        ) : null}
      </StyledRow>
    </Tooltip>
  )
}
