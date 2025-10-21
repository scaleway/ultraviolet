'use client'

import { Stack, Text } from '@ultraviolet/ui'
import type { ReactNode } from 'react'
import { cellText, desc, term } from '../styles.css'

type CellProps = {
  children: ReactNode
  title: ReactNode
  multiline?: boolean
}

export const InfoTableCell = ({
  children,
  title,
  multiline = false,
}: CellProps) => (
  <Stack gap="0.5" minWidth="0" width="100%">
    <dt className={term}>
      <Text
        as="div"
        prominence="weak"
        sentiment="neutral"
        variant="bodySmallStrong"
      >
        {title}
      </Text>
    </dt>
    <dd className={desc}>
      <Text
        as="div"
        className={cellText}
        oneLine={!multiline}
        prominence="default"
        sentiment="neutral"
        variant="body"
      >
        {children}
      </Text>
    </dd>
  </Stack>
)
