import { theme } from '@ultraviolet/themes'
import { createVar, globalStyle, style } from '@vanilla-extract/css'

export const colorLine = createVar()
export const backgroundColorLegend = createVar()

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

export const lineChartBody = style({})

globalStyle(`${lineChartBody} > :not(:last-child)`, {
  borderBottom: `1px solid ${theme.colors.neutral.backgroundStrong}`,
})

export const lineChartHead = style({
  display: 'flex',
  paddingBottom: theme.space[1],
  borderBottom: `1px solid ${theme.colors.neutral.backgroundStrong}`,
})

globalStyle(`${lineChartHead} > :not(:last-child)`, {
  marginRight: theme.space[1],
})

export const lineChartLegend = style({
  marginLeft: theme.space[2],
  width: theme.sizing[400],
  height: 2,
  backgroundColor: backgroundColorLegend,
})

export const lineChartRow = style({
  display: 'flex',
  padding: `${theme.space['0.5']} 0`,
})

globalStyle(`${lineChartRow} > :not(:last-child)`, {
  marginRight: theme.space[1],
})
