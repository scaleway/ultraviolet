import { theme } from '@ultraviolet/themes'
import { createVar, globalStyle, style } from '@vanilla-extract/css'

export const colorLine = createVar()
export const backgroundColorLegend = createVar()

export const textLegend = style({
  alignSelf: 'center',
  flex: 1,
  minWidth: theme.sizing[900],
  textAlign: 'right',
})

export const cellValueContainer = style({
  alignItems: 'center',
  display: 'flex',
})

export const longContainer = style({
  display: 'flex',
  flex: 6,
})

export const container = style({
  marginTop: theme.space[2],
})

export const lineTooltipContainer = style({
  alignItems: 'center',
  background: theme.colors.neutral.backgroundStronger,
  borderRadius: theme.radii.small,
  boxShadow: theme.shadows.tooltip,
  display: 'flex',
  padding: `${theme.space['0.5']} ${theme.space[1]}`,
})

export const lineColorSquare = style({
  background: colorLine,
  display: 'block',
  height: theme.sizing[175],
  marginRight: theme.space['1.5'],
  width: theme.sizing[175],
})

export const lineChartBody = style({})

globalStyle(`${lineChartBody} > :not(:last-child)`, {
  borderBottom: `1px solid ${theme.colors.neutral.backgroundStrong}`,
})

export const lineChartHead = style({
  borderBottom: `1px solid ${theme.colors.neutral.backgroundStrong}`,
  display: 'flex',
  paddingBottom: theme.space[1],
})

globalStyle(`${lineChartHead} > :not(:last-child)`, {
  marginRight: theme.space[1],
})

export const lineChartLegend = style({
  backgroundColor: backgroundColorLegend,
  height: 2,
  marginLeft: theme.space[2],
  width: theme.sizing[400],
})

export const lineChartRow = style({
  display: 'flex',
  padding: `${theme.space['0.5']} 0`,
})

globalStyle(`${lineChartRow} > :not(:last-child)`, {
  marginRight: theme.space[1],
})
