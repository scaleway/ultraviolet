'use client'

import { ArrowDownIcon, ArrowUpIcon } from '@ultraviolet/icons'
import { theme } from '@ultraviolet/themes'
import { cn } from '@ultraviolet/utils'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import type {
  CSSProperties,
  MouseEventHandler,
  ReactNode,
  RefObject,
} from 'react'
import {
  Children,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useRef,
} from 'react'
import type { SENTIMENTS, space } from '../../theme'
import { Button } from '../Button'
import { Checkbox } from '../Checkbox'
import { Tooltip } from '../Tooltip'
import { Cell } from './Cell'
import { ColumnProvider } from './ColumnProvider'
import { useListContext } from './ListContext'
import {
  listCheckboxContainer,
  listCheckboxInRange,
  listExpandableCell,
  listExpandableWrapper,
  listNoPaddingCell,
  listRow,
} from './styles.css'
import { paddingExpandableCell } from './variables.css'

type RowProps = {
  children: ReactNode
  id: string
  expandable?: ReactNode
  /**
   * Row cannot be selected if this prop is provided. boolean true disabled selection, a string disable selection and a tooltip will be displayed on checkbox hover.
   */
  selectDisabled?: boolean | string
  disabled?: boolean
  sentiment?: (typeof SENTIMENTS)[number]
  expanded?: boolean
  className?: string
  /**
   * Define a custom padding for the content in the expandable
   */
  expandablePadding?: keyof typeof space
  highlightAnimation?: boolean
  'data-testid'?: string
  style?: CSSProperties
  'data-dragging'?: boolean
  onMouseEnter?: MouseEventHandler<HTMLTableRowElement>
  onMouseLeave?: MouseEventHandler<HTMLTableRowElement>
  onClick?: (id: string) => void
}

export const Row = forwardRef<HTMLTableRowElement, RowProps>(
  (
    {
      children,
      id,
      expandable,
      disabled,
      selectDisabled,
      sentiment = 'neutral',
      highlightAnimation,
      expanded,
      className,
      expandablePadding,
      'data-testid': dataTestid,
      style,
      'data-dragging': dataDragging,
      onMouseEnter,
      onMouseLeave,
      onClick,
    },
    forwardedRef,
  ) => {
    const {
      selectable,
      registerExpandableRow,
      expandedRowIds,
      expandRow,
      collapseRow,
      registerSelectableRow,
      selectedRowIds,
      expandButton,
      columns,
      inRange,
      refList,
      setRefList,
      handleOnChange,
    } = useListContext()

    const expandedRowId = useId()

    const checkboxRef = useRef<HTMLInputElement>(null)

    const isSelectDisabled =
      disabled || (selectDisabled !== undefined && selectDisabled !== false)

    const hasExpandable = !!expandable
    useEffect(() => {
      if (hasExpandable) {
        const unregisterCallback = registerExpandableRow(id, expanded)

        return unregisterCallback
      }

      return undefined
    }, [id, hasExpandable, registerExpandableRow, expanded, expandRow])

    useEffect(() => {
      if (!isSelectDisabled) {
        const unregisterCallback = registerSelectableRow(id)

        return unregisterCallback
      }

      return undefined
    }, [id, registerSelectableRow, isSelectDisabled])

    const toggleRowExpand = useCallback(() => {
      if (expandedRowIds[id]) {
        collapseRow(id)
      } else {
        expandRow(id)
      }
    }, [collapseRow, expandRow, expandedRowIds, id])

    const canClickRowToExpand = !disabled && !!expandable && !expandButton

    useEffect(() => {
      if (
        checkboxRef.current !== null &&
        !refList.includes(checkboxRef as RefObject<HTMLInputElement>)
      ) {
        setRefList([...refList, checkboxRef as RefObject<HTMLInputElement>])
      }
    }, [refList, setRefList])

    const validChildrenArray = Children.toArray(children).filter(child =>
      isValidElement(child),
    )

    const totalColumns =
      columns.length + (selectable ? 1 : 0) + (expandButton ? 1 : 0)

    return (
      <>
        <tr
          aria-controls={
            expandable && expandedRowIds[id] ? expandedRowId : undefined
          }
          aria-disabled={disabled}
          aria-expanded={expandable ? expandedRowIds[id] : undefined}
          className={cn(className, listRow({ highlightAnimation, sentiment }))}
          data-dragging={dataDragging}
          data-highlight={selectable && !!selectedRowIds[id]}
          data-testid={dataTestid}
          onClick={() => {
            onClick?.(id)
            if (canClickRowToExpand) {
              toggleRowExpand()
            }
          }}
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
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          ref={forwardedRef}
          role={canClickRowToExpand ? 'button row' : undefined}
          style={style}
          tabIndex={canClickRowToExpand ? 0 : -1}
        >
          {selectable ? (
            <ColumnProvider width={theme.sizing[300]}>
              <Cell className={listNoPaddingCell}>
                <div className={listCheckboxContainer}>
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
                        inRange?.includes(id) ? listCheckboxInRange : ''
                      }
                      disabled={isSelectDisabled}
                      name="list-select-checkbox"
                      onChange={() => handleOnChange(id, selectedRowIds[id])}
                      ref={checkboxRef}
                      value={id}
                    />
                  </Tooltip>
                </div>
              </Cell>
            </ColumnProvider>
          ) : null}
          {expandButton ? (
            <ColumnProvider width={theme.sizing[400]}>
              <Cell className={listNoPaddingCell}>
                <Button
                  aria-label="expand"
                  data-testid="list-expand-button"
                  disabled={disabled || !expandable}
                  onClick={() => toggleRowExpand()}
                  sentiment={sentiment}
                  size="small"
                  variant="ghost"
                >
                  {expandedRowIds[id] ? <ArrowUpIcon /> : <ArrowDownIcon />}
                </Button>
              </Cell>
            </ColumnProvider>
          ) : null}
          {validChildrenArray.map((child, index) => {
            const column = columns[index]

            return (
              <ColumnProvider
                key={`column-provider-${child.key}`}
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
            className={listExpandableWrapper}
            data-expandable-content
            data-highlight={selectable && !!selectedRowIds[id]}
            id={expandedRowId}
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
            <Cell
              className={listExpandableCell}
              colSpan={totalColumns}
              style={assignInlineVars({
                [paddingExpandableCell]: theme.space[expandablePadding ?? '2'],
              })}
            >
              {expandable}
            </Cell>
          </tr>
        ) : null}
      </>
    )
  },
)
