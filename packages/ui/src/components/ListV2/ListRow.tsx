import styled from '@emotion/styled'
import type { MouseEventHandler, ReactNode } from 'react'
import { useEffect } from 'react'
import { SENTIMENTS } from '../../theme'
import { Checkbox } from '../Checkbox'
import { Icon } from '../Icon'
import { Tooltip } from '../Tooltip'
import { ListCell } from './ListCell'
import { useListContext } from './ListContext'

// @note : make sure Selectable & Expandable arrow contents are sync with column width
export const SELECTABLE_CELL_WIDTH = 24
export const EXPANDABLE_ARROW_CELL_WIDTH = 16

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

const StyledRow = styled('div', {})<{
  'data-disabled': boolean
  'data-hoverable': boolean
  'data-highlight': boolean
  'data-sentiment': typeof SENTIMENTS[number] | undefined
  'aria-expanded': boolean
}>`
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.neutral.borderWeak};
  border-radius: ${({ theme }) => theme.radii.default};
  transition: box-shadow 200ms ease, border-color 200ms ease;
  background-color: ${({ theme }) => theme.colors.neutral.background};
  cursor: auto;
  font-size: ${({ theme }) => theme.typography.bodySmall.fontSize};

  &[role='button row'] {
    cursor: pointer;
  }

  ${({ theme }) =>
    SENTIMENTS.map(
      color => `
    &[data-sentiment="${color}"] {
      color: ${theme.colors[color].text};
      border-color: ${theme.colors[color].border};
      background-color: ${theme.colors[color].background};
    }

    &[data-sentiment="${color}"][data-highlight="true"] {
      border-color: ${theme.colors[color].border};
      box-shadow: none;
    }

    &[data-sentiment="${color}"][data-hoverable='true']:hover {
      border-color: ${theme.colors[color].border};
      box-shadow: none;
    }

    &[data-sentiment="${color}"] [data-expandable-content] {
      border-color: ${theme.colors[color].border};
    }
    `,
    ).join(' ')}

  &[data-hoverable='true']:hover, &[data-sentiment="neutral"][data-highlight="true"], &[data-sentiment="neutral"][data-hoverable='true']:hover {
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

  & [data-expandable-content] {
    grid-column: 1 / -1;
    border-top: 1px solid ${({ theme }) => theme.colors.neutral.borderWeak};
    padding: ${({ theme }) => `${theme.space['2']} ${theme.space['2']}`};
    grid-row-start: 2;
    grid-row-end: 2;
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

const ListCellContainer = styled('div', {
  shouldForwardProp: prop => !['template'].includes(prop),
})<{
  template: string
}>`
  display: grid;
  grid-template-columns: ${({ template }) => template};
  padding: 0 ${({ theme }) => theme.space['2']};
  align-items: center;
  column-gap: ${({ theme }) => theme.space['2']};
`

type ListRowProps = {
  children: ReactNode
  className?: string
  isHoverable?: boolean
  isDisabled?: boolean
  isHighlighted?: boolean
  id: string
  checkboxDisabled?: boolean
  checkboxTooltip?: string
  tooltip?: string
  sentiment?: typeof SENTIMENTS[number]
  expandable?: ReactNode
  /**
   * If expandable content visibility is controlled, specify this prop to TRUE or FALSE
   */
  isExpanded?: boolean
}

export const ListRow = ({
  children,
  className,
  isDisabled = false,
  isHoverable = true,
  isHighlighted = false,
  id,
  sentiment,
  tooltip,
  checkboxTooltip,
  checkboxDisabled,
  expandable,
  isExpanded,
}: ListRowProps) => {
  const {
    autoClose,
    template,
    selectedIds,
    setSelectedIds,
    expandedRowIds,
    setExpandedRowIds,
    setSelectablesIds,
  } = useListContext()
  const isSelected = id && selectedIds ? selectedIds.includes(id) : false
  const isRowExpanded = isExpanded === true || expandedRowIds[id] === true

  const handleExpand: MouseEventHandler<HTMLTableRowElement> = () => {
    setExpandedRowIds(current =>
      autoClose ? { [id]: !current[id] } : { ...current, [id]: !current[id] },
    )
  }

  // Registering selectable row
  useEffect(() => {
    if (!checkboxDisabled && setSelectedIds !== undefined) {
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

  return (
    <Tooltip text={tooltip}>
      <StyledRow
        className={className}
        data-disabled={isDisabled}
        // @note: Force data-hoverable to true, if click on row expand content
        data-hoverable={
          expandable !== undefined && isExpanded === undefined
            ? true
            : isHoverable
        }
        data-highlight={!!isHighlighted || isSelected}
        data-sentiment={sentiment}
        role={expandable && isExpanded === undefined ? 'button row' : 'row'}
        aria-expanded={isRowExpanded}
        aria-haspopup={
          expandable !== undefined && !isDisabled && isExpanded === undefined
        }
        onClick={
          expandable && !isDisabled && isExpanded === undefined
            ? handleExpand
            : undefined
        }
      >
        <ListCellContainer template={template}>
          {setSelectedIds !== undefined && selectedIds !== undefined ? (
            <ListCell preventClick>
              <StyledCheckboxContainer
                data-visibility={
                  selectedIds?.length === 0 ? 'hover' : undefined
                }
              >
                <StyledTooltip text={checkboxTooltip}>
                  <StyledCheckbox
                    size={SELECTABLE_CELL_WIDTH}
                    name="list-radio"
                    value={id}
                    checked={isSelected}
                    onChange={event => {
                      if (event.target.checked) {
                        setSelectedIds([...selectedIds, event.target.value])
                      } else {
                        setSelectedIds(
                          selectedIds.filter(
                            selectedId => selectedId !== event.target.value,
                          ),
                        )
                      }
                    }}
                    disabled={isDisabled || checkboxDisabled}
                    aria-label="check"
                  />
                </StyledTooltip>
              </StyledCheckboxContainer>
            </ListCell>
          ) : null}
          {expandable !== undefined && isExpanded === undefined ? (
            <ArrowIconCell>
              <ArrowIcon name="arrow-down" size={EXPANDABLE_ARROW_CELL_WIDTH} />
            </ArrowIconCell>
          ) : null}
          {children}
        </ListCellContainer>
        {expandable ? (
          <div data-expandable-content>{isRowExpanded ? expandable : null}</div>
        ) : null}
      </StyledRow>
    </Tooltip>
  )
}
