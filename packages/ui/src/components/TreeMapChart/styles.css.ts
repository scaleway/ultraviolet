import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'

export const treeMapTooltipContainer = style({
  display: 'flex',
  flexDirection: 'column',
  background: theme.colors.neutral.backgroundWeakElevated,
  borderRadius: theme.radii.small,
  boxShadow: theme.shadows.tooltip,
  padding: `${theme.space[1]} ${theme.space[2]}`,
})

export const treeMapContentWrapper = style({
  color: theme.colors.neutral.background,
  padding: theme.space[1],
  borderRadius: theme.space[1],
  position: 'absolute',
})
