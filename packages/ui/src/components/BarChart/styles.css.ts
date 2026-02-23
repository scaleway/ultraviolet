import { theme } from '@ultraviolet/themes'
import { createVar, style } from '@vanilla-extract/css'

export const colorBar = createVar()

const tooltipContainer = style({
  alignItems: 'center',
  background: theme.colors.neutral.backgroundWeakElevated,
  borderRadius: theme.radii.small,
  boxShadow: theme.shadows.tooltip,
  display: 'flex',
  padding: `${theme.space[1]} ${theme.space[2]}`,
})

const colorSquare = style({
  background: colorBar,
  display: 'block',
  height: theme.sizing[150],
  marginRight: theme.space['1.5'],
  width: theme.sizing[150],
})

export const barChartStyle = {
  tooltipContainer,
  colorSquare,
}
