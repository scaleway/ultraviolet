'use client'

import type { ComponentProps, ReactNode } from 'react'
import { List } from '../../../List'
import { Stack } from '../../../Stack'
import { Text } from '../../../Text'
import { offerListStyle } from '../styles.css'

type BannerProps = {
  children: ReactNode
  sentiment?: ComponentProps<typeof List.Row>['sentiment']
  disabled?: boolean
  colSpan?: number
  type?: 'cell' | 'div'
  shouldHavePrimaryBorder?: boolean
}

export const Banner = ({
  children,
  sentiment = 'neutral',
  disabled,
  colSpan = 1000,
  type = 'div',
  shouldHavePrimaryBorder,
}: BannerProps) =>
  type === 'div' ? (
    <Stack
      aria-disabled={disabled}
      className={offerListStyle.bannerStack({ sentiment })}
    >
      <Text as="p" disabled={disabled} sentiment={sentiment} variant="caption">
        {children}
      </Text>
    </Stack>
  ) : (
    <tr className={offerListStyle.banner}>
      <List.Cell
        aria-disabled={disabled}
        className={offerListStyle.bannerCell}
        colSpan={colSpan}
      >
        <Text
          as="p"
          className={offerListStyle.bannerText({
            disabled,
            primaryBorder: shouldHavePrimaryBorder,
            sentiment,
          })}
          disabled={disabled}
          variant="caption"
        >
          {children}
        </Text>
      </List.Cell>
    </tr>
  )
