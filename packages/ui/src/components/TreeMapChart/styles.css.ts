import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'

export const treeMapTooltipContainer = style({
  background: theme.colors.neutral.backgroundWeakElevated,
  borderRadius: theme.radii.small,
  boxShadow: theme.shadows.tooltip,
  display: 'flex',
  flexDirection: 'column',
  padding: `${theme.space[1]} ${theme.space[2]}`,
})

export const treeMapContentWrapper = style({
  borderRadius: theme.space[1],
  color: theme.colors.neutral.background,
  padding: theme.space[1],
  position: 'absolute',
})
