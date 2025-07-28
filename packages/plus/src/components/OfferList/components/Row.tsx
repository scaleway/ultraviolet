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
          <Banner sentiment={banner.sentiment} disabled={disabled}>
            {banner.text}
          </Banner>
        </>
      )
    }
    if (expandable && !loading) return expandableContent

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

  return (
    <>
      <StyledRow
        highlightAnimation={highlightAnimation}
        className={className}
        data-testid={dataTestId}
        data-dragging={dataDragging}
        style={style}
        disabled={disabled}
        id={id}
        expandable={computedExpandableContent}
        expandablePadding={banner ? '0' : undefined}
        expanded={expanded ?? expandedRowIds[id]}
        hasBanner={!!banner}
        selected={
          selectable === 'checkbox'
            ? checkboxSelectedRows[id]
            : radioSelectedRow === id
        }
      >
        <NoPaddingCell>
          {badge ? (
            <BadgeContainer>
              <StyledBadge
                sentiment={badge.sentiment}
                disabled={disabled}
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
              {selectable === 'checkbox' ? (
                <Checkbox
                  name={`checkbox-offer-list-${id}`}
                  aria-label="select"
                  checked={checkboxSelectedRows[id]}
                  value={id}
                  id={id}
                  disabled={disabled || loading || !!selectDisabled}
                  onChange={() => {
                    const newSelectedRows = {
                      ...checkboxSelectedRows,
                      [id]: checkboxSelectedRows[id]
                        ? !checkboxSelectedRows[id]
                        : true,
                    }
                    setCheckboxSelectedRows(newSelectedRows)
                    onChangeSelect?.(
                      Object.keys(newSelectedRows).filter(
                        key => newSelectedRows[key],
                      ),
                    )
                    if (expandedRowIds[id]) {
                      expandRow(id)
                    } else if (!autoCollapse) {
                      collapseRow(id)
                    }
                  }}
                />
              ) : (
                <Radio
                  name={`radio-offer-list-${id}`}
                  checked={radioSelectedRow === id}
                  value={id}
                  id={id}
                  disabled={disabled || loading || !!selectDisabled}
                  onChange={event => {
                    setRadioSelectedRow(event.currentTarget.id)
                    onChangeSelect?.(offerName)
                    if (expandedRowIds[id]) {
                      expandRow(id)
                    } else if (!autoCollapse) {
                      collapseRow(id)
                    }
                  }}
                />
              )}
            </Tooltip>
          </SelectableContainer>
        </NoPaddingCell>
        {expandable ? (
          <NoPaddingCell>
            <Button
              disabled={disabled || !expandable || loading}
              onClick={toggleRowExpand}
              size="small"
              sentiment="neutral"
              variant="ghost"
              aria-label="expand"
              data-testid="list-expand-button"
            >
              {expandedRowIds[id] ? <ArrowUpIcon /> : <ArrowDownIcon />}
            </Button>
          </NoPaddingCell>
        ) : null}
        {children}
      </StyledRow>
      {banner && !expandedRowIds[id] ? (
        <Banner
          disabled={disabled}
          colSpan={childrenNumber}
          type="cell"
          sentiment={banner.sentiment}
        >
          {banner.text}
        </Banner>
      ) : null}
    </>
  )
}
