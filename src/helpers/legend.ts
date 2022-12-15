import type { Theme } from '@emotion/react'

export const legendColors = (theme: Theme): string[] => [
  theme.colors.success.backgroundStrong,
  theme.colors.secondary.backgroundStrong,
  theme.colors.info.backgroundStrong,
  theme.colors.danger.backgroundStrong,
  theme.colors.primary.backgroundStrong,
  theme.colors.warning.backgroundStrong,
]

export const getLegendColor = (index: number, theme: Theme): string => {
  const colors = legendColors(theme)

  return colors[index] || colors[colors.length % index]
}
