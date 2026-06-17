import type { ReactNode } from 'react'
import type { WCAG_PRINCIPLES } from './constants'

export type A11yLevel = 'partial' | 'compliant' | 'certified'

export type A11yLevelInfo = {
  level: A11yLevel
  label: string
  icon: ReactNode
  description: ReactNode
}

export type WcagPrinciple = (typeof WCAG_PRINCIPLES)[number]['name']

export type ComponentA11yStatus = Record<WcagPrinciple, boolean>

export type AuditCategories = {
  id: string
  label: string
  completed: boolean
}[]

export type ComponentStoryParameters = {
  deprecated?: boolean
  experimental?: boolean
  a11yStatus?: ComponentA11yStatus
}
