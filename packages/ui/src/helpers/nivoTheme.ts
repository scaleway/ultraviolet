import type { useTheme } from '@emotion/react'
import type { Theme as NivoTheme } from '@nivo/core'

// be aware that this theme is applied on all chart using nivo library, please check any changes you make here on all charts
export const getNivoTheme = (theme: ReturnType<typeof useTheme>) =>
  ({
    axis: {
      ticks: {
        line: {
          stroke: theme.colors.neutral.backgroundStrong,
          strokeWidth: 1,
        },
      },
    },
    text: {
      fill: theme.colors.neutral.text,
      outlineColor: theme.colors.neutral.background,
      fontFamily: theme.typography.body.fontFamily,
      fontSize: theme.typography.bodySmall.fontSize,
      fontWeight: theme.typography.bodySmall.fontWeight,
      lineHeight: theme.typography.bodySmall.lineHeight,
      letterSpacing: theme.typography.bodySmall.letterSpacing,
    },
  }) satisfies NivoTheme
