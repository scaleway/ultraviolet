import styled from '@emotion/styled'
import {
  ChangeEventHandler,
  MouseEventHandler,
  ReactNode,
  useEffect,
} from 'react'
import type { Color } from '../../theme'
import Checkbox from '../Checkbox'
import Icon from '../Icon'
import Tooltip from '../Tooltip'
import { ListCell } from './ListCell'
import { useListContext } from './ListContext'

const StyledIcon = styled(Icon)``
const StyledListCell = styled(ListCell)`
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

export const LIST_ROW_VARIANTS = [
  'danger',
  'warning',
  'primary',
  'success',
  'neutral',
  'info',
] as const

const StyledRow = styled('div', {
  shouldForwardProp: prop => prop !== 'template',
})<{
  template: string
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
  col-gap: ${({ theme }) => theme.space['1']};

  &[role='button row'] {
    cursor: pointer;
  }

  ${({ theme }) =>
    LIST_ROW_VARIANTS.map(
      color => `
    &[data-variant="${color}"] {
      color: ${theme.colors[color as Color].text};
      border-color: ${theme.colors[color as Color].border};
      background-color: ${theme.colors[color as Color].background};
    }

    &[data-variant="${color}"][data-highlight="true"] {
      border-color: ${theme.colors[color as Color].border};
      box-shadow: none;
    }

    &[data-variant="${color}"][data-hoverable='true']:hover {
      border-color: ${theme.colors[color as Color].border};
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

  & > [role='cell']:last-of-type {
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

  & ${StyledIcon} {
    transition: transform 250ms ease-in-out;
  }

  &[aria-expanded='true'] ${StyledIcon} {
    transform: rotate(-180deg);
  }
`

type ListRowProps = {
  children: ReactNode
  className?: string
  isHoverable?: boolean
  isDisabled?: boolean
  isHighlighted?: boolean
  isExpandable?: boolean
  isExpanded?: boolean
  id: string
  checkboxRender?: ReactNode
  checkboxDisabled?: boolean
  checkboxTooltip?: string
  tooltip?: string
  variant?: typeof LIST_ROW_VARIANTS[number]
  hideArrow?: boolean
}

export const ListRow = ({
  children,
  className,
  isDisabled,
  isHoverable = true,
  isHighlighted,
  isExpanded: forceExpand,
  isExpandable,
  id,
  checkboxRender,
  variant,
  hideArrow = false,
  tooltip,
  checkboxTooltip,
  checkboxDisabled,
}: ListRowProps) => {
  const {
    autoClose,
    template,
    selectable,
    selectedIds,
    setSelectedIds,
    expandedIds,
    setExpandedIds,
    disabledRowsRef,
  } = useListContext()
  const isSelected = id ? selectedIds.includes(id) : false
  const isExpanded = forceExpand || (id ? expandedIds.includes(id) : false)

  useEffect(() => {
    if (forceExpand && id && !expandedIds.includes(id)) {
      setExpandedIds(current => Array.from(new Set([...current, id])))
    }
  }, [expandedIds, forceExpand, id, setExpandedIds])

  const handleExpand: MouseEventHandler<HTMLTableRowElement> = () => {
    setExpandedIds(current => {
      const indexOfItem = current.indexOf(id)
      if (indexOfItem > -1) {
        current.splice(indexOfItem, 1)

        return [...current]
      }

      return autoClose ? [id] : Array.from(new Set([...current, id]))
    })
  }

  const handleCheck: ChangeEventHandler<HTMLInputElement> = event => {
    if (event.target.checked) {
      setSelectedIds(current =>
        Array.from(new Set([...current, event.target.value])),
      )
    } else {
      setSelectedIds(current => {
        const indexOfItem = current.indexOf(event.target.value)
        current.splice(indexOfItem, 1)

        return [...current]
      })
    }
  }

  const computedTemplate = isExpandable ? `${template} 25px` : template

  useEffect(() => {
    if (
      id &&
      (isDisabled || checkboxDisabled) &&
      !disabledRowsRef.current.includes(id)
    ) {
      disabledRowsRef.current.push(id)
    }
    if (
      id &&
      !isDisabled &&
      !checkboxDisabled &&
      disabledRowsRef.current.includes(id)
    ) {
      disabledRowsRef.current = disabledRowsRef.current.filter(
        disabledId => disabledId !== id,
      )
    }
  }, [isDisabled, id, disabledRowsRef, checkboxDisabled])

  useEffect(() => {
    if ((isDisabled || checkboxDisabled) && selectedIds.includes(id)) {
      setSelectedIds(current => {
        const indexOfItem = current.indexOf(id)
        current.splice(indexOfItem, 1)

        return [...current]
      })
    }
  }, [id, isDisabled, selectedIds, setSelectedIds, checkboxDisabled])

  return (
    <Tooltip text={tooltip}>
      <StyledRow
        className={className}
        data-disabled={isDisabled ?? false}
        data-hoverable={isHoverable ?? false}
        data-highlight={!!isHighlighted || isSelected}
        data-variant={variant}
        role={isExpandable ? 'button row' : 'row'}
        template={computedTemplate}
        aria-expanded={isExpanded}
        aria-haspopup={isExpandable}
        onClick={isExpandable && !isDisabled ? handleExpand : undefined}
      >
        {selectable ? (
          <ListCell isClickable>
            {checkboxRender ?? (
              <StyledCheckboxContainer
                data-visibility={selectedIds.length === 0 ? 'hover' : undefined}
              >
                <StyledTooltip text={checkboxTooltip}>
                  <StyledCheckbox
                    name="list-radio"
                    value={id}
                    checked={isSelected}
                    onChange={handleCheck}
                    disabled={!id || isDisabled || checkboxDisabled}
                  />
                </StyledTooltip>
              </StyledCheckboxContainer>
            )}
          </ListCell>
        ) : null}
        {children}
        {isExpandable && !isDisabled && !hideArrow ? (
          <StyledListCell>
            <StyledIcon name="arrow-down" />
          </StyledListCell>
        ) : null}
      </StyledRow>
    </Tooltip>
  )
}
