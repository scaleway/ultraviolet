'use client'

import { Text } from '../../Text'

type DialogTextProps = {
  children: React.ReactNode
}

export const DialogText = ({ children }: DialogTextProps) => (
  <Text as="p" sentiment="neutral" variant="body">
    {children}
  </Text>
)
