import { Theme } from '@emotion/react'

export const legendColors = (theme: Theme): string[] => [
  theme.colors.success.backgroundStrong,
  theme.colors.primary.backgroundStrong,
  theme.colors.neutral.background,
]

export const getLegendColor = (index: number, theme: Theme): string => {
  const colors = legendColors(theme)

  return colors[index] || colors[colors.length - 1]
}
