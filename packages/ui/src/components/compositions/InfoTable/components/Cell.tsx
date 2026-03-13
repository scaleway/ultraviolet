'use client'

import type { CSSProperties, ReactNode } from 'react'
import { Stack } from '../../../Stack'
import { Text } from '../../../Text'
import { infoTableStyle } from '../styles.css'

export type CellProps = {
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
    className={infoTableStyle.cell}
    gap="0.5"
    minWidth="0"
    style={style}
    width="100%"
  >
    <Text
      as="dt"
      className={infoTableStyle.term}
      prominence="weak"
      sentiment="neutral"
      variant="bodySmallStrong"
    >
      {title}
    </Text>
    <Text
      as="dd"
      className={infoTableStyle.desc}
      oneLine={!multiline}
      prominence="default"
      sentiment="neutral"
      variant="body"
    >
      {children}
    </Text>
  </Stack>
)
