import { Theme } from '@emotion/react'

export const legendColors = (theme: Theme): string[] => [
  theme.colors.success.backgroundStrong,
  theme.colors.secondary.backgroundStrong,
  theme.colors.neutral.backgroundStrong,
]

export const getLegendColor = (index: number, theme: Theme): string => {
  const colors = legendColors(theme)

  return colors[index] || colors[colors.length - 1]
}
