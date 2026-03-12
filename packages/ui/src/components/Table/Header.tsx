'use client'

import type { ReactNode } from 'react'
import { tableStyle } from './styles.css'

type HeaderProps = {
  children: ReactNode
  highlighted?: boolean
}

export const Header = ({ children, highlighted }: HeaderProps) => (
  <thead className={tableStyle.header({ highlighted })}>{children}</thead>
)
