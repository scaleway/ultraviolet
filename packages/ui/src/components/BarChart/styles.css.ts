import { theme } from '@ultraviolet/themes'
import { createVar, style } from '@vanilla-extract/css'

export const colorBar = createVar()

export const barTooltipContainer = style({
  display: 'flex',
  background: theme.colors.neutral.backgroundWeakElevated,
  borderRadius: theme.radii.small,
  boxShadow: theme.shadows.tooltip,
  padding: `${theme.space[1]} ${theme.space[2]}`,
  alignItems: 'center',
})

export const barColorSquare = style({
  display: 'block',
  width: theme.sizing[150],
  height: theme.sizing[150],
  background: colorBar,
  marginRight: theme.space['1.5'],
})
