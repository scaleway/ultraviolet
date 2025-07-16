'use client'

import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { ArrowDownIcon, ArrowUpIcon } from '@ultraviolet/icons'
import { Button, List, Radio, Stack } from '@ultraviolet/ui'
import { Children, useCallback, useMemo } from 'react'
import type { ComponentProps, ReactNode } from 'react'
import { useOfferListContext } from '../OfferListProvider'
import { SELECTABLE_RADIO_SIZE } from '../constants'
import { Banner } from './Banner'

const NoPaddingCell = styled(List.Cell, {
  shouldForwardProp: prop => !['maxWidth'].includes(prop),
})<{
  maxWidth: string
}>`
  padding: 0;

  &:first-of-type {
    padding-left: ${({ theme }) => theme.space['2']};
  }

  max-width: ${({ maxWidth }) => maxWidth};
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

    &[aria-expanded='true'] {
      ${({ theme, selected }) =>
        selected
          ? `td, td:first-child, td:last-child {
      border-color: ${theme.colors.primary.border};
    }`
          : null}
    }

    ${({ hasBanner }) =>
      hasBanner
        ? `td, td:first-child {
        border-bottom-right-radius: 0; 
        border-bottom-left-radius: 0;
    }
    `
        : null}
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
    disabled?: boolean
  }
  offerName: string
}
export const Row = ({
  children,
  disabled,
  sentiment = 'neutral',
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
}: RowProps) => {
  const {
    selectable,
    radioSelectedRow,
    setRadioSelectedRow,
    expandable,
    loading,
    onChangeSelect,
    autoCollapse,
  } = useOfferListContext()
  const { expandedRowIds, collapseRow, expandRow } = List.useListContext()
  const theme = useTheme()

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
        <Stack>
          <CustomExpandable padding={expandablePadding}>
            {expandableContent}
          </CustomExpandable>
          <Banner sentiment={banner.sentiment} disabled={banner.disabled}>
            {banner.text}
          </Banner>
        </Stack>
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
  ])

  if (selectable === 'radio') {
    return (
      <>
        <StyledRow
          selectDisabled={selectDisabled}
          highlightAnimation={highlightAnimation}
          className={className}
          data-testid={dataTestId}
          data-dragging={dataDragging}
          style={style}
          disabled={disabled}
          sentiment={sentiment}
          id={id}
          expandable={computedExpandableContent}
          expandablePadding={banner ? '0' : undefined}
          selected={radioSelectedRow === id}
          expanded={expanded ?? expandedRowIds[id]}
          hasBanner={!!banner}
        >
          <NoPaddingCell maxWidth={theme.sizing[SELECTABLE_RADIO_SIZE]}>
            <Radio
              name={`radio-offer-list-${id}`}
              checked={radioSelectedRow === id}
              value={id}
              id={id}
              disabled={disabled || loading}
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
          </NoPaddingCell>
          {expandable ? (
            <NoPaddingCell maxWidth={theme.sizing[SELECTABLE_RADIO_SIZE]}>
              <Button
                disabled={disabled || !expandable || loading}
                onClick={toggleRowExpand}
                size="small"
                sentiment={sentiment}
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
            disabled={banner.disabled}
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

  return (
    <>
      <StyledRow
        highlightAnimation={highlightAnimation}
        className={className}
        data-testid={dataTestId}
        data-dragging={dataDragging}
        style={style}
        expanded={expanded}
        disabled={disabled}
        sentiment={sentiment}
        id={offerName}
        expandable={computedExpandableContent}
        selectDisabled={selectDisabled || loading}
        expandablePadding={banner ? '0' : undefined}
        hasBanner={!!banner}
        selected={false}
      >
        {children}
      </StyledRow>
      {banner && !expandedRowIds[id] ? (
        <Banner
          colSpan={childrenNumber}
          type="cell"
          sentiment={banner.sentiment}
          disabled={banner.disabled}
        >
          {banner.text}
        </Banner>
      ) : null}
    </>
  )
}
