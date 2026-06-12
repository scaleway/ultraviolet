'use client'

import type { ReactNode } from 'react'
import type { BadgeProps } from '../Badge'
import { Badge } from '../Badge'
import { Stack } from '../Stack'
import { Text } from '../Text'

type SelectableCardGroupLabelProps = {
  label: ReactNode
  labelDescription?: ReactNode
  badgeText?: ReactNode
  badgeProminence?: BadgeProps['prominence']
  badgeSentiment?: BadgeProps['sentiment']
  badgeSize?: BadgeProps['size']
  sideText?: ReactNode
  disabled?: boolean
}

export const SelectableCardGroupLabel = ({
  label,
  labelDescription,
  badgeText,
  badgeProminence = 'default',
  badgeSentiment = 'neutral',
  badgeSize = 'medium',
  sideText,
  disabled = false,
}: SelectableCardGroupLabelProps) => (
  <Stack alignItems="center" direction="row" gap={1}>
    <Stack alignItems="center" direction="row" gap={0.5}>
      {label}
      {labelDescription && typeof labelDescription === 'function' ? labelDescription : null}
      {labelDescription && typeof labelDescription !== 'function' ? (
        <Text as="span" disabled={disabled} variant="body">
          {labelDescription}
        </Text>
      ) : null}
      {badgeText ? (
        <Badge disabled={disabled} prominence={badgeProminence} sentiment={badgeSentiment} size={badgeSize}>
          {badgeText}
        </Badge>
      ) : null}
    </Stack>
    {sideText ? (
      <Text as="span" disabled={disabled} sentiment="primary" variant="bodySmallStronger">
        {sideText}
      </Text>
    ) : null}
  </Stack>
)
