'use client'

import { cn } from '@ultraviolet/utils'

import { Badge as BadgeUV } from '../../../Badge'
import { Checkbox } from '../../../Checkbox'
import { List } from '../../../List'
import { Radio } from '../../../Radio'
import { Tooltip } from '../../../Tooltip'
import { useOfferListContext } from '../OfferListProvider'
import { offerListStyle } from '../styles.css'

import type { ComponentProps, ReactNode } from 'react'

export const SelectableCell = ({
  disabled,
  loading,
  selectDisabled,
  isSelected,
  banner,
  badge,
  id,
  isRowSelected,
  handleChangeCheckbox,
  handleChangeRadio,
}: {
  disabled?: boolean
  loading?: boolean
  selectDisabled?: string | boolean
  isSelected: boolean
  banner?: {
    text: ReactNode
    sentiment?: 'neutral' | 'primary' | 'warning' | 'danger'
  }
  badge?: {
    text: string
    sentiment?: ComponentProps<typeof BadgeUV>['sentiment']
    prominence?: ComponentProps<typeof BadgeUV>['prominence']
  }
  id: string
  isRowSelected: boolean
  handleChangeRadio: () => void
  handleChangeCheckbox: () => void
}) => {
  const { selectable, expandable, autoCollapse } = useOfferListContext()
  const { expandedRowIds, collapseRow, expandRow } = List.useListContext()

  const isSelectableDisabled = disabled || loading || !!selectDisabled

  return (
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
          text={typeof selectDisabled === 'string' ? selectDisabled : undefined}
        >
          {selectable === 'radio' ? (
            <Radio
              aria-label={`select-${id}`}
              checked={isRowSelected}
              disabled={isSelectableDisabled}
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
              disabled={isSelectableDisabled}
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
  )
}
