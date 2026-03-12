'use client'

import { ArrowDownIcon } from '@ultraviolet/icons/ArrowDownIcon'
import { ArrowUpIcon } from '@ultraviolet/icons/ArrowUpIcon'
import { theme } from '@ultraviolet/themes'
import { cn } from '@ultraviolet/utils'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { ComponentProps, CSSProperties, ReactNode } from 'react'
import { Children, useCallback, useMemo, useState } from 'react'
import { Badge as BadgeUV } from '../../../Badge'
import { Button } from '../../../Button'
import { Checkbox } from '../../../Checkbox'
import { List } from '../../../List'
import { Radio } from '../../../Radio'
import { Tooltip } from '../../../Tooltip'
import { useOfferListContext } from '../OfferListProvider'
import {
  expandablePadding as expandablePaddingVar,
  offerListStyle,
} from '../styles.css'
import { Banner } from './Banner'
import { OfferListRowContext } from './OfferListRowProvider'

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

  const isSelectableDisable = disabled || loading || !!selectDisabled

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
        <List.Cell
          className={cn(
            offerListStyle.noPaddingCell,
            isSelected ? offerListStyle.selectedCell : '',
            banner ? offerListStyle.cellNoRadius : '',
          )}
        >
          {badge ? (
            <BadgeUV
              className={offerListStyle.badge}
              disabled={disabled}
              prominence={badge.prominence}
              sentiment={badge.sentiment}
              size="small"
            >
              {badge.text}
            </BadgeUV>
          ) : null}
          <div className={offerListStyle.rowSelectableContainer}>
            <Tooltip
              text={
                typeof selectDisabled === 'string' ? selectDisabled : undefined
              }
            >
              {selectable === 'radio' ? (
                <Radio
                  aria-label={`select-${id}`}
                  checked={isRowSelected}
                  disabled={isSelectableDisable}
                  id={id}
                  name={`radio-offer-list-${id}`}
                  onChange={() => {
                    // When !expandable, selection is triggered in the onClick of List.Row
                    if (expandable) {
                      handleChangeRadio()
                    }
                    if (expandedRowIds[id]) {
                      expandRow(id)
                    } else if (!autoCollapse) {
                      collapseRow(id)
                    }
                  }}
                  value={id}
                />
              ) : (
                <Checkbox
                  aria-label="select"
                  checked={isRowSelected}
                  disabled={isSelectableDisable}
                  id={id}
                  name={`checkbox-offer-list-${id}`}
                  onChange={() => {
                    if (expandable) {
                      handleChangeCheckbox()
                    }
                  }}
                  value={id}
                />
              )}
            </Tooltip>
          </div>
        </List.Cell>
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
