'use client'

import type { ReactNode } from 'react'
import { tableHeader } from './styles.css'

type HeaderProps = {
  children: ReactNode
}

export const Header = ({ children }: HeaderProps) => (
  <thead className={tableHeader}>{children}</thead>
)
