import type { Theme as NivoTheme } from '@nivo/core'
import type { useTheme } from '@ultraviolet/themes'

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
      fontFamily: theme.typography.body.fontFamily,
      fontSize: theme.typography.bodySmall.fontSize,
      fontWeight: theme.typography.bodySmall.fontWeight,
      letterSpacing: theme.typography.bodySmall.letterSpacing,
      lineHeight: theme.typography.bodySmall.lineHeight,
      outlineColor: theme.colors.neutral.background,
    },
  }) satisfies NivoTheme
