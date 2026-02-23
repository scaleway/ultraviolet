'use client'

import type { ReactNode } from 'react'
import { tableStyle } from './styles.css'

type HeaderProps = {
  children: ReactNode
}

export const Header = ({ children }: HeaderProps) => (
  <thead className={tableStyle.header}>{children}</thead>
)
