'use client'

import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { ArrowDownIcon, ArrowUpIcon } from '@ultraviolet/icons'
import { Button, List, Radio, Stack } from '@ultraviolet/ui'
import {
  ComponentProps,
  type ReactNode,
  createContext,
  useCallback,
  useMemo,
} from 'react'
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
  shouldForwardProp: prop => !['selected'].includes(prop),
})<{ selected: boolean }>`
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

`

const CustomExpandable = styled('div', {
  shouldForwardProp: prop => !['padding'].includes(prop),
})<{ padding?: ComponentProps<typeof List.Row>['expandablePadding'] }>`
    padding: ${({ theme, padding }) =>
      padding ? theme.space[padding] : theme.space['2']};

`

export const RowContext = createContext<{ disabled: boolean } | undefined>(
  undefined,
)

type RowProps = ComponentProps<typeof List.Row> & {
  banner?: {
    text: ReactNode
    position: 'top' | 'bottom'
    sentiment?: ComponentProps<typeof List.Row>['sentiment']
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
  ...props
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

  const toggleRowExpand = useCallback(() => {
    if (!loading) {
      if (expandedRowIds[id]) {
        collapseRow(id)
      } else {
        expandRow(id)
      }
    }
  }, [collapseRow, expandRow, expandedRowIds, id])

  const computedExpandable = useMemo(() => {
    if (expandable && !loading) {
      if (banner) {
        return (
          <Stack direction="column">
            {banner.position === 'top' ? (
              <Banner sentiment={banner.sentiment}>{banner.text}</Banner>
            ) : null}
            <CustomExpandable padding={expandablePadding}>
              {props.expandable}
            </CustomExpandable>
            {banner.position === 'bottom' ? (
              <Banner sentiment={banner.sentiment} borderTop>
                {banner.text}
              </Banner>
            ) : null}
          </Stack>
        )
      }

      return props.expandable
    }

    return undefined
  }, [])

  if (selectable === 'radio') {
    return (
      <RowContext.Provider value={{ disabled: !!disabled }}>
        <StyledRow
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
          disabled={disabled}
          sentiment={sentiment}
          id={id}
          expandable={computedExpandable}
          expandablePadding={banner ? '0' : undefined}
          selected={radioSelectedRow === id}
          expanded={expandedRowIds[id]}
        >
          <NoPaddingCell maxWidth={theme.sizing[SELECTABLE_RADIO_SIZE]}>
            <Radio
              name="radio-offer-list"
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
              data-testid={`radio-offer-list-${id}`}
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
      </RowContext.Provider>
    )
  }

  return (
    <RowContext.Provider value={{ disabled: !!disabled }}>
      <List.Row
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        disabled={disabled}
        sentiment={sentiment}
        id={offerName}
        expandable={computedExpandable}
        selectDisabled={props.selectDisabled || loading}
        expandablePadding={banner ? '0' : undefined}
      >
        {children}
      </List.Row>
    </RowContext.Provider>
  )
}
