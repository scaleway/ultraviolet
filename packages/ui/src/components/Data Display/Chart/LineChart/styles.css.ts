import { theme } from '@ultraviolet/themes'
import { createVar, style } from '@vanilla-extract/css'

export const colorLine = createVar()
export const backgroundColorLegend = createVar()

const textLegend = style({
  alignSelf: 'center',
  flex: 1,
  minWidth: theme.sizing[900],
  textAlign: 'right',
})

const cellValueContainer = style({
  alignItems: 'center',
  display: 'flex',
})

const longContainer = style({
  display: 'flex',
  flex: 6,
})

const container = style({
  marginTop: theme.space[2],
})

const lineTooltipContainer = style({
  alignItems: 'center',
  background: theme.colors.neutral.backgroundStronger,
  borderRadius: theme.radii.small,
  boxShadow: theme.shadows.tooltip,
  display: 'flex',
  padding: `${theme.space['0.5']} ${theme.space[1]}`,
})

const lineColorSquare = style({
  background: colorLine,
  display: 'block',
  height: theme.sizing[175],
  marginRight: theme.space['1.5'],
  width: theme.sizing[175],
})

const body = style({})

const head = style({
  borderBottom: `1px solid ${theme.colors.neutral.backgroundStrong}`,
  display: 'flex',
  paddingBottom: theme.space[1],
})

const headTitle = style({
  selectors: {
    '&:not(:last-child)': {
      marginRight: theme.space[1],
    },
  },
})

const legend = style({
  backgroundColor: backgroundColorLegend,
  height: 2,
  marginLeft: theme.space[2],
  width: theme.sizing[400],
})

const row = style({
  display: 'flex',
  padding: `${theme.space['0.5']} 0`,
  selectors: {
    [`${body} > &:not(:last-child)`]: {
      borderBottom: `1px solid ${theme.colors.neutral.backgroundStrong}`,
    },
  },
})

const content = style({
  selectors: {
    [`${row} > &:not(:last-child)`]: {
      marginRight: theme.space[1],
    },
  },
})

export const lineChartStyle = {
  textLegend,
  cellValueContainer,
  longContainer,
  container,
  lineTooltipContainer,
  row,
  lineColorSquare,
  body,
  head,
  headTitle,
  legend,
  content,
}
