import { theme } from '@ultraviolet/themes'
import { createVar, style } from '@vanilla-extract/css'

export const colorLine = createVar()

export const textLegend = style({
  textAlign: 'right',
  flex: 1,
  minWidth: theme.sizing[900],
  alignSelf: 'center',
})

export const cellValueContainer = style({
  display: 'flex',
  alignItems: 'center',
})

export const longContainer = style({
  display: 'flex',
  flex: 6,
})

export const container = style({
  marginTop: theme.space[2],
})

export const lineTooltipContainer = style({
  display: 'flex',
  background: theme.colors.neutral.backgroundStronger,
  borderRadius: theme.radii.small,
  boxShadow: theme.shadows.tooltip,
  padding: `${theme.space['0.5']} ${theme.space[1]}`,
  alignItems: 'center',
})

export const lineColorSquare = style({
  display: 'block',
  width: theme.sizing[175],
  height: theme.sizing[175],
  background: colorLine,
  marginRight: theme.space['1.5'],
})
