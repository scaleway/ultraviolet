'use client'

import type { CSSProperties } from 'react'
import { Text } from '../../Text'

type DialogTextProps = {
  children: React.ReactNode
  style?: CSSProperties
}

export const DialogText = ({ children, style }: DialogTextProps) => (
  <Text as="p" sentiment="neutral" style={style} variant="body">
    {children}
  </Text>
)
