'use client'

import { cn } from '@ultraviolet/utils'

import { Stack } from '../../../components/Stack'
import { Text } from '../../../components/Text'
import { infoTableStyle } from '../styles.css'

import type { CSSProperties, ReactNode } from 'react'

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
      className={cn(
        infoTableStyle.desc,
        typeof children === 'string' ? '' : infoTableStyle.descFlex,
      )}
      oneLine={!multiline}
      prominence="default"
      sentiment="neutral"
      variant="body"
    >
      {children}
    </Text>
  </Stack>
)
