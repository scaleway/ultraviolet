'use client'

import type { ReactNode } from 'react'

type BodyProps = {
  children: ReactNode
}

export const Body = ({ children }: BodyProps) => <tbody>{children}</tbody>
