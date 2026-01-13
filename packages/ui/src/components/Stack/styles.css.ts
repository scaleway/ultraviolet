import { consoleLightTheme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'
import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles'
import { flexVar, maxWidthVar, minWidthVar, widthVar } from './variables.css'

export const stack = style({
  display: 'flex',
  flex: flexVar,
  maxWidth: maxWidthVar,
  minWidth: minWidthVar,
  width: widthVar,
})

// Get the keys and sort them by their pixel value. It's important to define breakpoints priority
const orderedBreakpointKeys = Object.keys(
  consoleLightTheme.breakpoints,
).toSorted(
  (a, b) =>
    Number.parseInt(
      consoleLightTheme.breakpoints[
        a as keyof typeof consoleLightTheme.breakpoints
      ],
      10,
    ) -
    Number.parseInt(
      consoleLightTheme.breakpoints[
        b as keyof typeof consoleLightTheme.breakpoints
      ],
      10,
    ),
)

const themeBreakpoints = orderedBreakpointKeys.reduce(
  (acc, key) => ({
    ...acc,
    [key]: {
      '@media': `screen and (min-width: ${consoleLightTheme.breakpoints[key as keyof typeof consoleLightTheme.breakpoints]})`,
    },
  }),
  {},
) as Record<keyof typeof consoleLightTheme.breakpoints, { '@media': string }>

const themeSpace = Object.values(consoleLightTheme.space)

const alignItemsValues = [
  'normal',
  'stretch',
  'center',
  'start',
  'end',
  'flex-start',
  'flex-end',
  'self-start',
  'self-end',
  'baseline',
  'first baseline',
  'last baseline',
  'safe center',
  'unsafe center',
] as const

export type AlignItemsType = (typeof alignItemsValues)[number]

const justifyContentValues = [
  'normal',
  'center',
  'start',
  'end',
  'flex-start',
  'flex-end',
  'left',
  'right',
  'space-between',
  'space-around',
  'space-evenly',
  'stretch',
] as const

export type JustifyContentType = (typeof justifyContentValues)[number]

export const responsiveProperties = defineProperties({
  conditions: themeBreakpoints,
  defaultCondition: 'xxsmall',
  properties: {
    alignItems: alignItemsValues,
    flexDirection: ['column', 'row', 'row-reverse', 'column-reverse'],
    flexWrap: ['nowrap', 'wrap', 'wrap-reverse'],
    gap: themeSpace,
    justifyContent: justifyContentValues,
  },
  responsiveArray: ['xxsmall', 'xsmall', 'small', 'medium', 'large'],
})

export const sprinkles = createSprinkles(responsiveProperties)
