import type { Theme } from '@emotion/react'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import { useCallback, useEffect, useRef } from 'react'
import { Button } from '../Button'
import { Checkbox } from '../Checkbox'
import { Tooltip } from '../Tooltip'
import { Cell } from './Cell'
import { useTableContext } from './TableContext'
import { SELECTABLE_CHECKBOX_SIZE } from './constants'

const ExpandableWrapper = styled.tr`
  width: 100%;
  display: table-row;
  vertical-align: middle;
  border-top: 1px solid ${({ theme }) => theme.colors.neutral.border};
  padding: ${({ theme }) => theme.space['1']};
  cursor: auto;
  background: ${({ theme }) => theme.colors.neutral.backgroundWeak};
  border-radius: 0 0 ${({ theme }) => theme.radii.default} ${({ theme }) => theme.radii.default};
`

const StyledCheckboxContainer = styled.div`
  display: flex;
  width: ${({ theme }) => theme.sizing[SELECTABLE_CHECKBOX_SIZE]};
`

const StyledCheckbox = styled(Checkbox, {
  shouldForwardProp: prop => !['inRange'].includes(prop),
})<{ inRange: boolean }>`

    rect {
      ${({ theme, inRange }) => (inRange ? `fill: ${theme.colors.neutral.backgroundHover};stroke: ${theme.colors.neutral.borderHover};` : '')}
    }
`

// We start at 5% and finish at 80% to leave the original background color
// as we can't know if the table will be stripped or not
const colorChange = (theme: Theme) => keyframes`
  5% {
    background-color: ${theme.colors.primary.background};
  }
  80% {
    background-color: ${theme.colors.primary.background};
  }
`

const StyledTr = styled('tr', {
  shouldForwardProp: prop => !['highlightAnimation'].includes(prop),
})<{ highlightAnimation?: boolean }>`
  animation: ${({ highlightAnimation, theme }) =>
    highlightAnimation ? colorChange(theme) : undefined}
    3s linear;
`

type RowProps = {
  children: ReactNode
  expandable?: ReactNode
  className?: string
  id: string
  'data-testid'?: string
  /**
   * Row cannot be selected if this prop is provided. boolean true disabled selection, a string disable selection and a tooltip will be displayed on checkbox hover.
   * */
  selectDisabled?: boolean | string
  highlightAnimation?: boolean
  expanded?: boolean
}

export const Row = ({
  children,
  className,
  id,
  selectDisabled,
  highlightAnimation,
  expandable,
  expanded,
  'data-testid': dataTestid,
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
    ref,
    inRange,
  } = useTableContext()
  const rowRef = useRef<HTMLInputElement>(null)

  const hasExpandable = !!expandable
  useEffect(() => {
    if (hasExpandable) {
      const unregisterCallback = registerExpandableRow(id, expanded)

      return unregisterCallback
    }

    return undefined
  }, [id, hasExpandable, registerExpandableRow, expanded, expandRow])

  useEffect(() => {
    if (!selectDisabled) {
      const unregisterCallback = registerSelectableRow(id)

      return unregisterCallback
    }

    return undefined
  }, [id, registerSelectableRow, selectDisabled])

  const toggleRowExpand = useCallback(() => {
    if (expandedRowIds[id]) {
      collapseRow(id)
    } else {
      expandRow(id)
    }
  }, [collapseRow, expandRow, expandedRowIds, id])

  const canClickRowToExpand = hasExpandable && !expandButton

  useEffect(() => {
    const refAtEffectStart = ref.current
    const { current } = rowRef

    if (refAtEffectStart && current && !refAtEffectStart.includes(current)) {
      ref.current.push(current)
    }
  }, [ref])

  return (
    <>
      <StyledTr
        className={className}
        data-testid={dataTestid}
        highlightAnimation={highlightAnimation}
        role={canClickRowToExpand ? 'button row' : 'row'}
      >
        {selectable ? (
          <Cell>
            <StyledCheckboxContainer>
              <Tooltip
                text={
                  typeof selectDisabled === 'string'
                    ? selectDisabled
                    : undefined
                }
              >
                <StyledCheckbox
                  name="table-select-checkbox"
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
                  disabled={selectDisabled !== undefined}
                  ref={rowRef}
                  inRange={inRange.includes(id)}
                />
              </Tooltip>
            </StyledCheckboxContainer>
          </Cell>
        ) : null}
        {expandButton ? (
          <Cell>
            <Button
              disabled={!expandable}
              icon={expandedRowIds[id] ? 'arrow-up' : 'arrow-down'}
              onClick={toggleRowExpand}
              size="xsmall"
              sentiment="neutral"
              variant="ghost"
              aria-label="expand"
              data-testid="list-expand-button"
            />
          </Cell>
        ) : null}
        {children}
      </StyledTr>
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
          <Cell colSpan={6}>{expandable}</Cell>
        </ExpandableWrapper>
      ) : null}
    </>
  )
}
