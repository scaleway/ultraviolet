'use client'

import { Stack, Text } from '@ultraviolet/ui'
import type { CSSProperties, ReactNode } from 'react'
import { cellText, desc, infoTableCell, term } from '../styles.css'

type CellProps = {
  children: ReactNode
  title: ReactNode
  multiline?: boolean
  style?: CSSProperties
}

export const InfoTableCell = ({
  children,
  title,
  multiline = false,
  style,
}: CellProps) => (
  <Stack
    className={infoTableCell}
    gap="0.5"
    minWidth="0"
    style={style}
    width="100%"
  >
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
