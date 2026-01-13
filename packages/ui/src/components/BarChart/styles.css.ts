import { theme } from '@ultraviolet/themes'
import { createVar, style } from '@vanilla-extract/css'

export const colorBar = createVar()

export const barTooltipContainer = style({
  alignItems: 'center',
  background: theme.colors.neutral.backgroundWeakElevated,
  borderRadius: theme.radii.small,
  boxShadow: theme.shadows.tooltip,
  display: 'flex',
  padding: `${theme.space[1]} ${theme.space[2]}`,
})

export const barColorSquare = style({
  background: colorBar,
  display: 'block',
  height: theme.sizing[150],
  marginRight: theme.space['1.5'],
  width: theme.sizing[150],
})
