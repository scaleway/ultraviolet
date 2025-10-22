'use client'

import { ArrowDownIcon, ArrowUpIcon } from '@ultraviolet/icons'
import { theme } from '@ultraviolet/themes'
import type { ReactNode, RefObject } from 'react'
import { Children, useCallback, useEffect, useRef } from 'react'
import { Button } from '../Button'
import { Checkbox } from '../Checkbox'
import { ColumnProvider } from '../List/ColumnProvider'
import { listCheckboxInRange, listNoPaddingCell } from '../List/styles.css'
import { Tooltip } from '../Tooltip'
import { Cell } from './Cell'
import {
  tableCheckboxContainer,
  tableExpandableWrapper,
  tableTrAnimation,
} from './styles.css'
import { useTableContext } from './TableContext'

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

  const childrenLength =
    Children.count(children) + (selectable ? 1 : 0) + (expandButton ? 1 : 0)

  useEffect(() => {
    if (
      refList &&
      checkboxRowRef.current !== null &&
      !refList.includes(checkboxRowRef as RefObject<HTMLInputElement>)
    ) {
      setRefList([...refList, checkboxRowRef as RefObject<HTMLInputElement>])
    }
  }, [refList, setRefList])

  return (
    <>
      <tr
        className={`${className ? `${className}` : ''}${highlightAnimation ? ` ${tableTrAnimation}` : ''}`}
        data-testid={dataTestid}
        role={canClickRowToExpand ? 'button row' : 'row'}
      >
        {selectable ? (
          <ColumnProvider width={theme.sizing[300]}>
            <Cell className={listNoPaddingCell}>
              <div className={tableCheckboxContainer}>
                <Tooltip
                  text={
                    typeof selectDisabled === 'string'
                      ? selectDisabled
                      : undefined
                  }
                >
                  <Checkbox
                    aria-label="select"
                    checked={selectedRowIds[id]}
                    className={
                      inRange?.includes(id) ? listCheckboxInRange : undefined
                    }
                    disabled={!!selectDisabled}
                    name="table-select-checkbox"
                    onChange={() => handleOnChange(id, selectedRowIds[id])}
                    ref={checkboxRowRef}
                    value={id}
                  />
                </Tooltip>
              </div>
            </Cell>
          </ColumnProvider>
        ) : null}
        {expandButton ? (
          <ColumnProvider width={theme.sizing[300]}>
            <Cell className={listNoPaddingCell}>
              <Button
                aria-label="expand"
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
              maxWidth={column?.maxWidth}
              minWidth={column?.minWidth}
              width={column?.width}
            >
              {child}
            </ColumnProvider>
          )
        })}
      </tr>
      {expandable && expandedRowIds[id] ? (
        <tr
          className={tableExpandableWrapper}
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
