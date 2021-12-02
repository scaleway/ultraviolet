import { Theme } from '@emotion/react'

export const legendColors = (theme: Theme): string[] => [
  theme.colorsDeprecated.chartGreen,
  theme.colorsDeprecated.chartPurple,
  theme.colorsDeprecated.gray350,
]

export const getLegendColor = (index: number, theme: Theme): string => {
  const colors = legendColors(theme)

  return colors[index] || colors[colors.length - 1]
}
