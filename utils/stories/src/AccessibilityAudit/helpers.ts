import { WCAG_PRINCIPLES } from './constants'
import type { ComponentStoryParameters, ComponentA11yStatus, AuditCategories, A11yLevel } from './types'

export const getComponentA11yStatus = (parameters: ComponentStoryParameters): ComponentA11yStatus => {
  if (!parameters?.a11yStatus) {
    return Object.fromEntries(WCAG_PRINCIPLES.map(principle => [principle.name, false])) as ComponentA11yStatus
  }

  return parameters.a11yStatus
}

export const getComponentAuditCategories = (parameters: ComponentStoryParameters): AuditCategories => {
  const a11yStatus = getComponentA11yStatus(parameters)

  return WCAG_PRINCIPLES.map(principle => ({
    id: principle.name,
    label: principle.label,
    completed: a11yStatus[principle.name] ?? false,
  }))
}

export const findA11yLevel = (parameters: { a11yStatus?: ComponentA11yStatus }): A11yLevel => {
  if (!parameters?.a11yStatus) {
    return 'partial'
  }

  return WCAG_PRINCIPLES.every(principle => parameters.a11yStatus?.[principle.name] === true) ? 'compliant' : 'partial'
}
