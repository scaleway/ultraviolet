'use client'

import { cn } from '@ultraviolet/utils'
import { useContext } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { Stack } from '../../../components/Stack'
import { Text } from '../../../components/Text'
import { InfoTableContext } from '../Context'
import { infoTableStyle } from '../styles.css'

export type CellProps = {
  children: ReactNode
  title: ReactNode
  multiline?: boolean
  style?: CSSProperties
}

export const InfoTableCell = ({ children, title, multiline = false, style }: CellProps) => {
  const { size } = useContext(InfoTableContext)

  return (
    <Stack gap="0.5" minWidth="0" style={style} width="100%">
      <Text
        as="dt"
        className={infoTableStyle.term}
        prominence="weak"
        sentiment="neutral"
        variant={size === 'small' ? 'captionStrong' : 'bodySmallStrong'}
      >
        {title}
      </Text>
      <Text
        as="dd"
        className={cn(infoTableStyle.desc, typeof children === 'string' ? '' : infoTableStyle.descFlex)}
        oneLine={!multiline}
        prominence="default"
        sentiment="neutral"
        variant={size === 'small' ? 'bodySmall' : 'body'}
      >
        {children}
      </Text>
    </Stack>
  )
}
