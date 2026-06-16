import { SettingsOutlineIcon, ShieldCheckOutlineIcon, ProgressCheckIcon } from '@ultraviolet/icons'
import { Text } from '@ultraviolet/ui'
import type { ReactNode } from 'react'

export type A11yLevel = 'partial' | 'compliant' | 'certified'

export type A11yLevelInfo = {
  level: A11yLevel
  label: string
  icon: ReactNode
  description: ReactNode
}

export const WCAG_PRINCIPLES = ['perceivable', 'operable', 'understandable', 'robust'] as const

export type WcagPrinciple = (typeof WCAG_PRINCIPLES)[number]

export const A11Y_LEVELS: Record<A11yLevel, A11yLevelInfo> = {
  partial: {
    level: 'partial',
    icon: <SettingsOutlineIcon size="medium" sentiment="danger" />,
    label: 'Partial',
    description: (
      <Text as="p" variant="body">
        A11y Partial means the component has some accessibility improvements but is not fully compliant. Work is in
        progress to meet accessibility standards.
      </Text>
    ),
  },
  compliant: {
    level: 'compliant',
    icon: <ProgressCheckIcon size="medium" sentiment="success" />,
    label: 'Compliant',
    description: (
      <Text as="p" variant="body">
        A11y Compliant means the component meets basic accessibility standards (WCAG 2.2 Level AA). The component has
        been audited and validated for accessibility.
      </Text>
    ),
  },
  certified: {
    level: 'certified',
    icon: <ShieldCheckOutlineIcon size="medium" sentiment="success" />,
    label: 'Certified',
    description: (
      <Text as="p" variant="body">
        A11y Certified means the component has been thoroughly tested and certified for accessibility compliance (WCAG
        2.2 Level AAA). This is the highest level of accessibility validation.
      </Text>
    ),
  },
}

export type ComponentA11yStatus = Record<WcagPrinciple, boolean>

export type AuditCategories = {
  id: string
  completed: boolean
}[]

export type ComponentStoryParameters = {
  deprecated?: boolean
  experimental?: boolean
  a11yStatus?: ComponentA11yStatus
}

export const getComponentA11yStatus = (parameters: ComponentStoryParameters): ComponentA11yStatus => {
  if (!parameters?.a11yStatus) {
    return Object.fromEntries(WCAG_PRINCIPLES.map(principle => [principle, false])) as ComponentA11yStatus
  }

  return parameters.a11yStatus
}

export const getComponentAuditCategories = (parameters: ComponentStoryParameters): AuditCategories => {
  const a11yStatus = getComponentA11yStatus(parameters)

  return WCAG_PRINCIPLES.map(principle => ({
    id: principle,
    completed: a11yStatus[principle] ?? false,
  }))
}

export const findA11yLevel = (parameters: { a11yStatus?: ComponentA11yStatus }): A11yLevel => {
  if (!parameters?.a11yStatus) {
    return 'partial'
  }

  return WCAG_PRINCIPLES.every(principle => parameters.a11yStatus?.[principle] === true) ? 'compliant' : 'partial'
}
