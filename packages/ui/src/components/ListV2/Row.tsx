import styled from '@emotion/styled'
import type { ForwardedRef, ReactNode } from 'react'
import { forwardRef, useEffect } from 'react'
import type { SENTIMENTS } from '../../theme'
import { Checkbox } from '../Checkbox'
import { Tooltip } from '../Tooltip'
import { Cell } from './Cell'
import { useListContext } from './ListContext'

const ExpandableWrapper = styled.div`
  grid-column: 1 / -1;
  grid-column-start: 1;
  border-top: 1px solid ${({ theme }) => theme.colors.neutral.borderWeak};
  margin: 0 -${({ theme }) => theme.space['2']};
  padding: ${({ theme }) => theme.space['2']};
  cursor: auto;
`

export const StyledRow = styled('div', {
  shouldForwardProp: prop => !['sentiment'].includes(prop),
})<{
  sentiment: (typeof SENTIMENTS)[number]
}>`
  /* List itself also apply style about common templating between HeaderRow and other Rows */

  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.neutral.borderWeak};
  border-radius: ${({ theme }) => theme.radii.default};
  transition: box-shadow 200ms ease, border-color 200ms ease;
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

  & [data-visibility='hover'] {
    opacity: 0;
  }
  &:hover [data-visibility='hover'] {
    opacity: 1;
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
  isDisabled?: boolean
  sentiment?: (typeof SENTIMENTS)[number]
  className?: string
  'data-testid'?: string
}

export const Row = forwardRef(
  (
    {
      children,
      id,
      expandable,
      isDisabled,
      selectDisabled,
      sentiment = 'neutral',
      className,
      'data-testid': dataTestid,
    }: RowProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const {
      allRowSelectValue,
      areRowSelectable,
      registerExpandableRow,
      expandedRowIds,
      expandRow,
      collapseRow,
      registerSelectableRow,
      selectedRowIds,
      selectRow,
      unselectRow,
    } = useListContext()

    const isSelectDisabled =
      isDisabled || (selectDisabled !== undefined && selectDisabled !== false)

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

    return (
      <StyledRow
        className={className}
        ref={ref}
        role={!isDisabled && expandable ? 'button row' : 'row'}
        onClick={!isDisabled && expandable ? toggleRowExpand : undefined}
        onKeyDown={
          !isDisabled && expandable
            ? event => {
                if (event.key === ' ') {
                  toggleRowExpand()
                  event.preventDefault()
                }
              }
            : undefined
        }
        tabIndex={!isDisabled && expandable ? 0 : -1}
        sentiment={sentiment}
        aria-disabled={isDisabled}
        aria-expanded={expandable ? expandedRowIds[id] : undefined}
        data-highlight={!!selectedRowIds[id]}
        data-testid={dataTestid}
      >
        {areRowSelectable ? (
          <Cell preventClick>
            <StyledCheckboxContainer
              data-visibility={
                allRowSelectValue === false ? 'hover' : undefined
              }
            >
              <Tooltip
                text={
                  typeof selectDisabled === 'string'
                    ? selectDisabled
                    : undefined
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
        {children}
        {expandable && expandedRowIds[id] ? (
          <ExpandableWrapper
            data-expandable-content
            onClick={e => {
              e.stopPropagation()
            }}
          >
            {expandable}
          </ExpandableWrapper>
        ) : null}
      </StyledRow>
    )
  },
)
