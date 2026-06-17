import { SettingsOutlineIcon, ShieldCheckOutlineIcon, ProgressCheckIcon } from '@ultraviolet/icons'
import { Text } from '@ultraviolet/ui'
import type { A11yLevel, A11yLevelInfo } from './types'

export const WCAG_PRINCIPLES = [
  { name: 'perceivable', label: 'Perceivable' },
  { name: 'operable', label: 'Operable' },
  { name: 'understandable', label: 'Understandable' },
  { name: 'robust', label: 'Robust' },
] as const

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
