import { theme } from '@ultraviolet/themes'
import { createVar, globalStyle, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { flash } from '../../utils'

export const heightContainerPie = createVar()
export const colorBullet = createVar()

const container = style({
  alignItems: 'start',
  display: 'flex',
  gap: `${85 - 12}px`, // compensate for the space inside the Pie component
  height: heightContainerPie,
  padding: `0 ${theme.space[1.5]}`,
})

const pieContainer = style({
  position: 'relative',
})

// patch the div container in the Pie component which has a wrong height
globalStyle(`${pieContainer} > div:first-child`, {
  display: 'flex',
})

const emptyLegend = style({
  alignSelf: 'center',
})

const content = style({
  display: 'inline-block',
  fontSize: theme.typography.headingStrong.fontSize,
  height: 100,
  inset: 0,
  lineHeight: '100px',
  margin: 'auto',
  position: 'absolute',
  textAlign: 'center',
  verticalAlign: 'middle',
  width: 100,
})

const list = style({
  display: 'flex',
  flex: '1',
  flexDirection: 'column',
  gap: theme.space[1],
  fontSize: theme.typography.bodySmall.fontSize,
  listStyleType: 'none',
  maxHeight: '100%',
  overflowY: 'auto',
  margin: 0,
  padding: 0,
})

const listItem = recipe({
  base: {
    alignItems: 'center',
    display: 'flex',
    gap: theme.space[1],
    width: '100%',
    color: theme.colors.neutral.text,
  },
  variants: {
    isFocused: {
      true: {
        color: theme.colors.primary.text,
        fontWeight: 500,
      },
    },
  },
})

const legendContainer = style({
  display: 'flex',
  flex: '1',
  flexDirection: 'column',
  gap: theme.space[1],
  maxHeight: '100%',
  overflowY: 'auto',
  padding: `${theme.space[1.5]} 0`,
})

const legendHeader = style({
  textAlign: 'end',
})

const bullet = style({
  background: colorBullet,
  borderRadius: theme.radii.circle,
  display: 'inline-block',
  height: 10,
  width: 10,
  flexShrink: 0,
  selectors: {
    [`${listItem.classNames.variants.isFocused.true} &`]: {
      animation: `${flash} linear 1500ms infinite`,
    },
  },
})

const label = style({
  alignItems: 'baseline',
  display: 'flex',
  flex: '1',
})

const toggleBox = style({
  height: 21,
  position: 'absolute',
  width: 250,
})

const line = style({
  borderBottom: `1px solid ${theme.colors.neutral.border}`,
  flex: 1,
  paddingTop: theme.space[1],
  selectors: {
    [`${listItem.classNames.variants.isFocused.true} &`]: {
      borderColor: theme.colors.primary.border,
    },
  },
})

const listTooltip = style({
  margin: 0,
  padding: `0 ${theme.space[1]} ${theme.space[1]} ${theme.space[1]}`,
  width: '100%',
})

const itemTooltip = style({
  display: 'flex',
  gap: theme.space[1],
  justifyContent: 'space-between',
  marginTop: 6,
  textAlign: 'left',
  width: '100%',
})

export const pieChartStyle = {
  container,
  emptyLegend,
  legendContainer,
  legendHeader,
  pieContainer,
  content,
  listItem,
  list,
  bullet,
  label,
  toggleBox,
  line,
  listTooltip,
  itemTooltip,
}
