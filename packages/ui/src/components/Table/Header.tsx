'use client'

import { tableStyle } from './styles.css'

import type { ReactNode } from 'react'

type HeaderProps = {
  children: ReactNode
  highlighted?: boolean
}

export const Header = ({ children, highlighted }: HeaderProps) => (
  <thead className={tableStyle.header({ highlighted })}>{children}</thead>
)
