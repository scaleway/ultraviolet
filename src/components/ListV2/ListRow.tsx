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
import { ListCell } from './ListCell'
import { useListContext } from './ListContext'

const StyledListCell = styled(ListCell)`
  display: flex;
  align-items: center;
  cursor: pointer;
  grid-col-start: -1;
`

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
  font-size: 14px;
  gap: ${({ theme }) => theme.space['1']};

  &[role='button'] {
    cursor: pointer;
  }

  &[data-hoverable='true']:hover {
    border-color: ${({ theme }) => theme.colors.primary.border};
    box-shadow: ${({ theme }) => theme.shadows.hoverPrimary};
  }

  ${({ theme }) =>
    Object.keys(theme.colors)
      .map(
        color => `
    &[data-variant="${color}"] {
    color: ${theme.colors[color as Color].text};
    border-color: ${theme.colors[color as Color].border};
    background-color: ${theme.colors[color as Color].background};
    }
    `,
      )
      .join(' ')}

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

  &:not([aria-expanded='true']) [data-expandable-content] {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  &[aria-expanded='true'] [data-expandable-content] {
    height: auto;
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
  variant?: Color
  hideArrow?: boolean
}

export const ListRow = ({
  children,
  className,
  isDisabled,
  isHoverable,
  isHighlighted,
  isExpanded: forceExpand,
  isExpandable,
  id,
  checkboxRender,
  variant,
  hideArrow = false,
}: ListRowProps) => {
  const {
    autoClose,
    template,
    selectable,
    selectedIds,
    setSelectedIds,
    expandedIds,
    setExpandedIds,
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

  return (
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
            <Checkbox
              data-visibility={selectedIds.length === 0 ? 'hover' : undefined}
              name="list-radio"
              value={id}
              checked={isSelected}
              onChange={handleCheck}
              disabled={!id || isDisabled}
            />
          )}
        </ListCell>
      ) : null}
      {children}
      {isExpandable && !isDisabled && !hideArrow ? (
        <StyledListCell>
          <Icon name={isExpanded ? 'arrow-up' : 'arrow-down'} />
        </StyledListCell>
      ) : null}
    </StyledRow>
  )
}
