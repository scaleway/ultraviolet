import styled from '@emotion/styled'
import type { ReactNode, Ref } from 'react'
import { useEffect } from 'react'
import type { SENTIMENTS } from '../../theme'
import { Button } from '../Button'
import { Checkbox } from '../Checkbox'
import { Tooltip } from '../Tooltip'
import { Cell } from './Cell'
import { useListContext } from './ListContext'

const ExpandableWrapper = styled.div`
  grid-column: 1 / -1;
  grid-column-start: 1;
  border-top: 1px solid ${({ theme }) => theme.colors.neutral.border};
  margin: 0 -${({ theme }) => theme.space['2']};
  padding: ${({ theme }) => theme.space['2']};
  cursor: auto;
  background: ${({ theme }) => theme.colors.neutral.backgroundWeak};
  border-radius: 0 0 ${({ theme }) => theme.radii.default}
    ${({ theme }) => theme.radii.default};
`

export const StyledRow = styled('div', {
  shouldForwardProp: prop => !['sentiment'].includes(prop),
})<{
  sentiment: (typeof SENTIMENTS)[number]
}>`
  /* List itself also apply style about common templating between HeaderRow and other Rows */

  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  border-radius: ${({ theme }) => theme.radii.default};
  transition:
    box-shadow 200ms ease,
    border-color 200ms ease;
  box-shadow: none;
  background-color: ${({ theme }) => theme.colors.neutral.background};
  font-size: ${({ theme }) => theme.typography.bodySmall.fontSize};
  column-gap: ${({ theme }) => theme.space['2']};
  padding: 0 ${({ theme }) => theme.space['2']};

  &[role='button row'] {
    cursor: pointer;
  }

  ${({ theme, sentiment }) =>
    `
    color: ${theme.colors[sentiment].text};
    border-color: ${theme.colors[sentiment].border};
    background-color: ${theme.colors[sentiment].background};
    & [data-expandable-content] {
      border-color: ${theme.colors[sentiment].border};
    }

    ${
      sentiment === 'neutral'
        ? `&:hover {
          border-color: ${theme.colors.primary.border};
          box-shadow: ${theme.shadows.hoverPrimary};
        }
        `
        : ''
    }
  `}

  &[data-highlight='true'] {
    border-color: ${({ theme }) => theme.colors.primary.border};
    box-shadow: ${({ theme }) => theme.shadows.hoverPrimary};
  }

  &[aria-disabled='true'] {
    border: 1px solid ${({ theme }) => theme.colors.neutral.borderDisabled};
    background-color: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
    color: ${({ theme }) => theme.colors.neutral.textDisabled};
    cursor: not-allowed;
  }
`

const StyledCheckboxContainer = styled.div`
  display: flex;
`

type RowProps = {
  children: ReactNode
  id: string
  expandable?: ReactNode
  /**
   * Row cannot be selected if this prop is provided. boolean true disabled selection, a string disable selection and a tooltip will be displayed on checkbox hover.
   * */
  selectDisabled?: boolean | string
  disabled?: boolean
  sentiment?: (typeof SENTIMENTS)[number]
  className?: string
  'data-testid'?: string
  ref?: Ref<HTMLDivElement>
}

export const Row = ({
  children,
  id,
  expandable,
  disabled,
  selectDisabled,
  sentiment = 'neutral',
  className,
  'data-testid': dataTestid,
  ref,
}: RowProps) => {
  const {
    selectable,
    registerExpandableRow,
    expandedRowIds,
    expandRow,
    collapseRow,
    registerSelectableRow,
    selectedRowIds,
    selectRow,
    unselectRow,
    expandButton,
  } = useListContext()

  const isSelectDisabled =
    disabled || (selectDisabled !== undefined && selectDisabled !== false)

  const hasExpandable = !!expandable
  useEffect(() => {
    if (hasExpandable) {
      const unregisterCallback = registerExpandableRow(id)

      return unregisterCallback
    }

    return undefined
  }, [id, hasExpandable, registerExpandableRow])

  useEffect(() => {
    if (!isSelectDisabled) {
      const unregisterCallback = registerSelectableRow(id)

      return unregisterCallback
    }

    return undefined
  }, [id, registerSelectableRow, isSelectDisabled])

  const toggleRowExpand = () => {
    if (expandedRowIds[id]) {
      collapseRow(id)
    } else {
      expandRow(id)
    }
  }

  const canClickRowToExpand = !disabled && !!expandable && !expandButton

  return (
    <StyledRow
      className={className}
      ref={ref}
      role={canClickRowToExpand ? 'button row' : 'row'}
      onClick={canClickRowToExpand ? toggleRowExpand : undefined}
      onKeyDown={
        canClickRowToExpand
          ? event => {
              if (event.key === ' ') {
                toggleRowExpand()
                event.preventDefault()
              }
            }
          : undefined
      }
      tabIndex={canClickRowToExpand ? 0 : -1}
      sentiment={sentiment}
      aria-disabled={disabled}
      aria-expanded={expandable ? expandedRowIds[id] : undefined}
      data-highlight={!!selectedRowIds[id]}
      data-testid={dataTestid}
    >
      {selectable ? (
        <Cell preventClick={canClickRowToExpand}>
          <StyledCheckboxContainer>
            <Tooltip
              text={
                typeof selectDisabled === 'string' ? selectDisabled : undefined
              }
            >
              <Checkbox
                name="list-select-checkbox"
                aria-label="select"
                checked={selectedRowIds[id]}
                value={id}
                onChange={() => {
                  if (selectedRowIds[id]) {
                    unselectRow(id)
                  } else {
                    selectRow(id)
                  }
                }}
                disabled={isSelectDisabled}
              />
            </Tooltip>
          </StyledCheckboxContainer>
        </Cell>
      ) : null}
      {expandButton ? (
        <Cell preventClick>
          <Button
            disabled={disabled || !expandable}
            icon={expandedRowIds[id] ? 'arrow-up' : 'arrow-down'}
            onClick={toggleRowExpand}
            size="small"
            sentiment="neutral"
            variant="ghost"
          />
        </Cell>
      ) : null}
      {children}
      {expandable && expandedRowIds[id] ? (
        <ExpandableWrapper
          data-expandable-content
          onClick={
            canClickRowToExpand
              ? e => {
                  e.stopPropagation()
                }
              : undefined
          }
          onKeyDown={
            canClickRowToExpand
              ? e => {
                  e.stopPropagation()
                }
              : undefined
          }
        >
          {expandable}
        </ExpandableWrapper>
      ) : null}
    </StyledRow>
  )
}
