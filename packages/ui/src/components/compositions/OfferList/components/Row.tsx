'use client'

import { ArrowDownIcon } from '@ultraviolet/icons/ArrowDownIcon'
import { ArrowUpIcon } from '@ultraviolet/icons/ArrowUpIcon'
import { theme } from '@ultraviolet/themes'
import { cn } from '@ultraviolet/utils'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import { Children, useCallback, useMemo, useState } from 'react'

import { Button } from '../../../Button'
import { List } from '../../../List'
import { useOfferListContext } from '../OfferListProvider'
import {
  expandablePadding as expandablePaddingVar,
  offerListStyle,
} from '../styles.css'

import { Banner } from './Banner'
import { OfferListRowContext } from './OfferListRowProvider'
import { SelectableCell } from './SelectableCell'

import type { Badge as BadgeUV } from '../../../Badge'
import type { ComponentProps, CSSProperties, ReactNode } from 'react'

type RowProps = ComponentProps<typeof List.Row> & {
  banner?: {
    text: ReactNode
    sentiment?: 'neutral' | 'primary' | 'warning' | 'danger'
  }
  offerName: string
  badge?: {
    text: string
    sentiment?: ComponentProps<typeof BadgeUV>['sentiment']
    prominence?: ComponentProps<typeof BadgeUV>['prominence']
  }
  style?: CSSProperties
}

export const Row = ({
  children,
  disabled,
  id,
  banner,
  expandablePadding,
  offerName,
  expandable: expandableContent,
  selectDisabled,
  highlightAnimation,
  expanded,
  className,
  'data-dragging': dataDragging,
  'data-testid': dataTestId,
  style,
  badge,
}: RowProps) => {
  const {
    selectable,
    radioSelectedRow,
    setRadioSelectedRow,
    checkboxSelectedRows,
    setCheckboxSelectedRows,
    expandable,
    loading,
    onChangeSelect,
    autoCollapse,
  } = useOfferListContext()
  const { expandedRowIds, collapseRow, expandRow } = List.useListContext()

  const [isHovered, setHovered] = useState(false)
  const childrenNumber =
    Children.count(children) + (selectable ? 1 : 0) + (expandable ? 1 : 0)

  const toggleRowExpand = useCallback(() => {
    if (!loading) {
      if (expandedRowIds[id]) {
        collapseRow(id)
      } else {
        expandRow(id)
      }
    }
  }, [collapseRow, expandRow, expandedRowIds, id, loading])

  const computedExpandableContent = useMemo(() => {
    if (expandable && !loading && expandedRowIds[id] && banner) {
      return (
        <>
          <div
            className={offerListStyle.rowExpandable}
            style={assignInlineVars({
              [expandablePaddingVar]: theme.space[expandablePadding ?? 2],
            })}
          >
            {expandableContent}
          </div>
          <Banner disabled={disabled} sentiment={banner.sentiment}>
            {banner.text}
          </Banner>
        </>
      )
    }
    if (expandable && !loading) {
      return expandableContent
    }

    return undefined
  }, [
    expandable,
    loading,
    expandedRowIds,
    banner,
    expandablePadding,
    id,
    expandableContent,
    disabled,
  ])

  const isRowSelected = useMemo(() => {
    if (selectable === 'radio') {
      return radioSelectedRow === offerName
    }

    return checkboxSelectedRows.includes(offerName)
  }, [offerName, checkboxSelectedRows, radioSelectedRow, selectable])

  const isSelected =
    selectable === 'radio'
      ? radioSelectedRow === offerName
      : checkboxSelectedRows.includes(offerName)

  const handleChangeCheckbox = () => {
    if (isRowSelected) {
      const newSelectedList = checkboxSelectedRows.filter(
        element => element !== offerName,
      )
      setCheckboxSelectedRows(newSelectedList)
      onChangeSelect?.(newSelectedList)
    } else {
      const newSelectedList = [...checkboxSelectedRows, offerName]
      setCheckboxSelectedRows(newSelectedList)
      onChangeSelect?.(newSelectedList)
    }

    if (expandedRowIds[id]) {
      expandRow(id)
    } else if (!autoCollapse) {
      collapseRow(id)
    }
  }

  const handleChangeRadio = () => {
    setRadioSelectedRow(offerName)
    onChangeSelect?.(offerName)
  }

  const offerListRowContextValue = useMemo(
    () => ({ selected: isSelected, banner: !!banner }),
    [isSelected, banner],
  )

  return (
    <>
      <List.Row
        className={cn(
          className,
          banner ? offerListStyle.rowBanner : '',
          isSelected ? offerListStyle.rowSelected : '',
          expandable
            ? offerListStyle.rowSelectedExpandable
            : offerListStyle.rowSelectedNotExpandable,
        )}
        data-dragging={dataDragging}
        data-testid={dataTestId}
        disabled={disabled}
        disabledClickRowToExpand
        expandable={computedExpandableContent}
        expandablePadding={banner ? '0' : undefined}
        expanded={expanded ?? expandedRowIds[id]}
        highlightAnimation={highlightAnimation}
        id={id}
        onClick={() => {
          if (selectDisabled || disabled || loading) {
            return
          }

          if (selectable === 'radio') {
            handleChangeRadio()
          }
          if (selectable === 'checkbox') {
            handleChangeCheckbox()
          }
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        selectDisabled={selectDisabled}
        style={style}
      >
        <SelectableCell
          badge={badge}
          banner={banner}
          disabled={disabled}
          handleChangeCheckbox={handleChangeCheckbox}
          handleChangeRadio={handleChangeRadio}
          id={id}
          isRowSelected={isRowSelected}
          isSelected={isSelected}
          loading={loading}
          selectDisabled={selectDisabled}
        />
        {expandable ? (
          <List.Cell
            className={cn(
              offerListStyle.noPaddingCell,
              isSelected ? offerListStyle.selectedCell : '',
            )}
          >
            <Button
              aria-label="expand"
              data-testid="list-expand-button"
              disabled={(disabled ?? !expandable) || loading}
              onClick={event => {
                event.stopPropagation()
                toggleRowExpand()
              }}
              sentiment="neutral"
              size="small"
              variant="ghost"
            >
              {expandedRowIds[id] ? <ArrowUpIcon /> : <ArrowDownIcon />}
            </Button>
          </List.Cell>
        ) : null}
        <OfferListRowContext.Provider value={offerListRowContextValue}>
          {children}
        </OfferListRowContext.Provider>
      </List.Row>
      {banner && !expandedRowIds[id] ? (
        <Banner
          colSpan={childrenNumber}
          disabled={disabled}
          sentiment={banner.sentiment}
          shouldHavePrimaryBorder={isHovered || isRowSelected}
          type="cell"
        >
          {banner.text}
        </Banner>
      ) : null}
    </>
  )
}
