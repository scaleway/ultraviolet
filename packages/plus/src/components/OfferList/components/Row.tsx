'use client'

import { ArrowDownIcon, ArrowUpIcon } from '@ultraviolet/icons'
import { theme } from '@ultraviolet/themes'
import {
  Badge as BadgeUV,
  Button,
  Checkbox,
  List,
  Radio,
  Tooltip,
} from '@ultraviolet/ui'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { ComponentProps, ReactNode } from 'react'
import { Children, useCallback, useMemo, useState } from 'react'
import { useOfferListContext } from '../OfferListProvider'
import {
  expandablePadding as expandablePaddingVar,
  offerListBadge,
  offerListBadgeContainer,
  offerListBanner,
  offerListNoPaddingCell,
  offerListRowBanner,
  offerListRowExpandable,
  offerListRowSelectableContainer,
  offerListRowSelected,
} from '../styles.css'
import { Banner } from './Banner'

type RowProps = ComponentProps<typeof List.Row> & {
  banner?: {
    text: ReactNode
    sentiment?: 'neutral' | 'primary' | 'warning' | 'danger'
  }
  offerName: string
  badge?: {
    text: string
    sentiment?: ComponentProps<typeof BadgeUV>['sentiment']
  }
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
            className={offerListRowExpandable}
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

  return (
    <>
      <List.Row
        className={`${className ? `${className} ` : ''}${banner ? offerListRowBanner : ''}${isSelected ? `${offerListBanner ? ' ' : ''}${offerListRowSelected}` : ''}`}
        data-dragging={dataDragging}
        data-testid={dataTestId}
        disabled={disabled}
        expandable={computedExpandableContent}
        expandablePadding={banner ? '0' : undefined}
        expanded={expanded ?? expandedRowIds[id]}
        highlightAnimation={highlightAnimation}
        id={id}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={style}
      >
        <List.Cell className={offerListNoPaddingCell}>
          {badge ? (
            <div className={offerListBadgeContainer}>
              <BadgeUV
                className={offerListBadge}
                disabled={disabled}
                sentiment={badge.sentiment}
                size="small"
              >
                {badge.text}
              </BadgeUV>
            </div>
          ) : null}
          <div className={offerListRowSelectableContainer}>
            <Tooltip
              text={
                typeof selectDisabled === 'string' ? selectDisabled : undefined
              }
            >
              {selectable === 'radio' ? (
                <Radio
                  checked={isRowSelected}
                  disabled={disabled || loading || !!selectDisabled}
                  id={id}
                  name={`radio-offer-list-${id}`}
                  onChange={() => {
                    setRadioSelectedRow(offerName)
                    onChangeSelect?.(offerName)
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
                  disabled={disabled || loading || !!selectDisabled}
                  id={id}
                  name={`checkbox-offer-list-${id}`}
                  onChange={() => {
                    if (isRowSelected) {
                      const newSelectedList = checkboxSelectedRows.filter(
                        element => element !== offerName,
                      )
                      setCheckboxSelectedRows(newSelectedList)
                      onChangeSelect?.(newSelectedList)
                    } else {
                      const newSelectedList = [
                        ...checkboxSelectedRows,
                        offerName,
                      ]
                      setCheckboxSelectedRows(newSelectedList)
                      onChangeSelect?.(newSelectedList)
                    }

                    if (expandedRowIds[id]) {
                      expandRow(id)
                    } else if (!autoCollapse) {
                      collapseRow(id)
                    }
                  }}
                  value={id}
                />
              )}
            </Tooltip>
          </div>
        </List.Cell>
        {expandable ? (
          <List.Cell className={offerListNoPaddingCell}>
            <Button
              aria-label="expand"
              data-testid="list-expand-button"
              disabled={disabled || !expandable || loading}
              onClick={toggleRowExpand}
              sentiment="neutral"
              size="small"
              variant="ghost"
            >
              {expandedRowIds[id] ? <ArrowUpIcon /> : <ArrowDownIcon />}
            </Button>
          </List.Cell>
        ) : null}
        {children}
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
