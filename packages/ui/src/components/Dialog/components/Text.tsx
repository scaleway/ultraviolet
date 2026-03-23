'use client'

import { Text } from '../../Text'

import type { CSSProperties } from 'react'

type DialogTextProps = {
  children: React.ReactNode
  style?: CSSProperties
}

export const DialogText = ({ children, style }: DialogTextProps) => (
  <Text as="p" sentiment="neutral" style={style} variant="body">
    {children}
  </Text>
)
