'use client'

import styled from '@emotion/styled'
import { ArrowDownIcon, ArrowUpIcon } from '@ultraviolet/icons'
import {
  Badge as BadgeUV,
  Button,
  Checkbox,
  List,
  Radio,
  Tooltip,
} from '@ultraviolet/ui'
import type { ComponentProps, ReactNode } from 'react'
import { Children, useCallback, useMemo } from 'react'
import { useOfferListContext } from '../OfferListProvider'
import { Banner, BannerWrapper } from './Banner'

const StyledBadge = styled(BadgeUV)`
  position: absolute;
  left: ${({ theme }) => theme.space[1]};
  transform: translateY(-150%);
  top: 0;
  left: ${({ theme }) => theme.space[3]};
`

const BadgeContainer = styled.div`
position: absolute;
top: ${({ theme }) => theme.space[2]};
`

const NoPaddingCell = styled(List.Cell)`
  padding: 0;
  width: 32px;

  &:first-of-type {
    padding-left: ${({ theme }) => theme.space['2']};
  }

`
const StyledRow = styled(List.Row, {
  shouldForwardProp: prop => !['selected', 'hasBanner'].includes(prop),
})<{ selected: boolean; hasBanner: boolean }>`

    ${({ theme, selected }) =>
      selected
        ? `td, td:first-child, td:last-child {
      border-color: ${theme.colors.primary.border};
    }`
        : null}

    &[aria-disabled='false']:hover + ${BannerWrapper} td {
      border-color: ${({ theme }) => theme.colors.primary.border};
    }

    &[aria-disabled='false'] + ${BannerWrapper} td {
      ${({ selected, theme }) => (selected ? `border-color: ${theme.colors.primary.border}` : '')}
    }

    &[aria-expanded='true'] {
      & + ${BannerWrapper} td {
        border-color: ${({ theme }) => theme.colors.primary.border};
      }
      ${({ theme, selected }) =>
        selected
          ? `
          td, td:first-child, td:last-child, & + tr td {
            border-color: ${theme.colors.primary.border};
          }
    `
          : null}
    }

    ${({ hasBanner }) =>
      hasBanner
        ? `td, td:first-child {
        border-bottom-left-radius: 0;
        }

        td, td:last-child {
          border-bottom-right-radius: 0;
        }
    `
        : null}
`

const SelectableContainer = styled.div`
  display: flex;
`

const CustomExpandable = styled('div', {
  shouldForwardProp: prop => !['padding'].includes(prop),
})<{ padding?: ComponentProps<typeof List.Row>['expandablePadding'] }>`
    padding: ${({ theme, padding }) =>
      padding ? theme.space[padding] : theme.space['2']};
`

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
          <CustomExpandable padding={expandablePadding}>
            {expandableContent}
          </CustomExpandable>
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

  return (
    <>
      <StyledRow
        className={className}
        data-dragging={dataDragging}
        data-testid={dataTestId}
        disabled={disabled}
        expandable={computedExpandableContent}
        expandablePadding={banner ? '0' : undefined}
        expanded={expanded ?? expandedRowIds[id]}
        hasBanner={!!banner}
        highlightAnimation={highlightAnimation}
        id={id}
        selected={
          selectable === 'radio'
            ? radioSelectedRow === offerName
            : checkboxSelectedRows.includes(offerName)
        }
        style={style}
      >
        <NoPaddingCell>
          {badge ? (
            <BadgeContainer>
              <StyledBadge
                disabled={disabled}
                sentiment={badge.sentiment}
                size="small"
              >
                {badge.text}
              </StyledBadge>
            </BadgeContainer>
          ) : null}
          <SelectableContainer>
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
          </SelectableContainer>
        </NoPaddingCell>
        {expandable ? (
          <NoPaddingCell>
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
          </NoPaddingCell>
        ) : null}
        {children}
      </StyledRow>
      {banner && !expandedRowIds[id] ? (
        <Banner
          colSpan={childrenNumber}
          disabled={disabled}
          sentiment={banner.sentiment}
          type="cell"
        >
          {banner.text}
        </Banner>
      ) : null}
    </>
  )
}
