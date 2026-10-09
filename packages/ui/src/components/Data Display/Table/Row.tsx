'use client'

import { ArrowDownIcon } from '@ultraviolet/icons/ArrowDownIcon'
import { ArrowUpIcon } from '@ultraviolet/icons/ArrowUpIcon'
import { theme } from '@ultraviolet/themes'
import { cn } from '@ultraviolet/utils'
import { Children, useCallback, useEffect, useRef } from 'react'
import type { CSSProperties, HTMLAttributes, ReactNode, RefObject } from 'react'
import { Button } from '../../Action/Button'
import { Checkbox } from '../../Data Entry/Checkbox'
import { Tooltip } from '../../Overlay/Tooltip'
import { ColumnProvider } from '../List/ColumnProvider'
import { Cell } from './Cell'
import { useTableContext } from './TableContext'
import { listStyle } from '../List/styles.css'
import { tableStyle } from './styles.css'

type RowProps = {
  children: ReactNode
  expandable?: ReactNode
  className?: string
  id: string
  'data-testid'?: string
  /**
   * Row cannot be selected if this prop is provided. boolean true disabled selection, a string disable selection and a tooltip will be displayed on checkbox hover.
   */
  selectDisabled?: boolean | string
  highlightAnimation?: boolean
  expanded?: boolean
  /**
   * Highlight the row for a stronger visual emphasis
   */
  highlight?: boolean
  style?: CSSProperties
} & Pick<HTMLAttributes<HTMLTableRowElement>, 'aria-current'>

export const Row = ({
  children,
  className,
  id,
  selectDisabled,
  highlightAnimation,
  expandable,
  expanded,
  highlight,
  style,
  'data-testid': dataTestid,
  'aria-current': ariaCurrent,
}: RowProps) => {
  const {
    selectable,
    registerExpandableRow,
    expandedRowIds,
    expandRow,
    collapseRow,
    registerSelectableRow,
    selectedRowIds,
    expandButton,
    inRange,
    columns,
    refList,
    setRefList,
    handleOnChange,
  } = useTableContext()

  const checkboxRowRef = useRef<HTMLInputElement>(null)

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

  const childrenLength = Children.count(children) + (selectable ? 1 : 0) + (expandButton ? 1 : 0)

  useEffect(() => {
    if (checkboxRowRef.current !== null && !refList.includes(checkboxRowRef as RefObject<HTMLInputElement>)) {
      setRefList([...refList, checkboxRowRef as RefObject<HTMLInputElement>])
    }
  }, [refList, setRefList])

  return (
    <>
      <tr
        className={cn(className, highlightAnimation ? tableStyle.trAnimation : '', tableStyle.row)}
        data-highlight={highlight}
        data-testid={dataTestid}
        role={canClickRowToExpand ? 'button row' : 'row'}
        style={style}
        aria-current={ariaCurrent}
        {...(selectable ? { 'aria-selected': selectedRowIds[id] } : {})}
      >
        {selectable ? (
          <ColumnProvider width={theme.sizing[300]} highlightRow={highlight}>
            <Cell>
              <div className={tableStyle.checkboxContainer}>
                <Tooltip text={typeof selectDisabled === 'string' ? selectDisabled : undefined}>
                  <Checkbox
                    aria-label="select"
                    checked={selectedRowIds[id]}
                    className={inRange?.includes(id) ? listStyle.checkboxInRange : undefined}
                    disabled={!!selectDisabled}
                    name="table-select-checkbox"
                    onChange={() => handleOnChange(id, selectedRowIds[id] ?? false)}
                    ref={checkboxRowRef}
                    value={id}
                  />
                </Tooltip>
              </div>
            </Cell>
          </ColumnProvider>
        ) : null}
        {expandButton ? (
          <ColumnProvider width={theme.sizing[300]} highlightRow={highlight}>
            <Cell>
              <Button
                accessibleLabel="expand"
                data-testid="list-expand-button"
                disabled={!expandable}
                onClick={toggleRowExpand}
                sentiment="neutral"
                size="xsmall"
                variant="ghost"
              >
                {expandedRowIds[id] ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </Button>
            </Cell>
          </ColumnProvider>
        ) : null}
        {Children.map(children, (child, index) => {
          const column = columns[index]

          return (
            <ColumnProvider
              // All those condition are indeed necessary
              // oxlint-disable-next-line typescript/no-unnecessary-condition
              maxWidth={column?.maxWidth}
              // oxlint-disable-next-line typescript/no-unnecessary-condition
              minWidth={column?.minWidth}
              // oxlint-disable-next-line typescript/no-unnecessary-condition
              width={column?.width}
              highlightRow={highlight}
            >
              {child}
            </ColumnProvider>
          )
        })}
      </tr>
      {expandable && expandedRowIds[id] ? (
        <tr
          className={tableStyle.expandableWrapper}
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
          <Cell colSpan={childrenLength}>{expandable}</Cell>
        </tr>
      ) : null}
    </>
  )
}

Row.displayName = 'Table.Row'
