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
  isSelectDisabled?: boolean
  selectTooltip?: string
  isDisabled?: boolean
  sentiment?: (typeof SENTIMENTS)[number]
  className?: string
}

export const Row = forwardRef(
  (
    {
      children,
      id,
      expandable,
      isDisabled,
      isSelectDisabled,
      selectTooltip,
      sentiment = 'neutral',
      className,
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

    useEffect(() => {
      if (expandable) {
        const unregisterCallback = registerExpandableRow(id)

        return unregisterCallback
      }

      return undefined
    }, [id, expandable, registerExpandableRow])

    useEffect(() => {
      if (!isSelectDisabled && !isDisabled) {
        const unregisterCallback = registerSelectableRow(id)

        return unregisterCallback
      }

      return undefined
    }, [id, registerSelectableRow, isSelectDisabled, isDisabled])

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
        data-highlight={selectedRowIds[id] === true}
      >
        {areRowSelectable ? (
          <Cell preventClick>
            <StyledCheckboxContainer
              data-visibility={
                allRowSelectValue === false ? 'hover' : undefined
              }
            >
              <Tooltip text={selectTooltip}>
                <Checkbox
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
                  disabled={isDisabled || isSelectDisabled}
                />
              </Tooltip>
            </StyledCheckboxContainer>
          </Cell>
        ) : null}
        {children}
        {expandable && expandedRowIds[id] ? (
          <ExpandableWrapper data-expandable-content>
            {expandable}
          </ExpandableWrapper>
        ) : null}
      </StyledRow>
    )
  },
)
