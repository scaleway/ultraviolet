import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles'
import { consoleLightTheme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'
import { flexVar, maxWidthVar, minWidthVar, widthVar } from './variables.css'

export const stack = style({
  display: 'flex',
  width: widthVar,
  maxWidth: maxWidthVar,
  minWidth: minWidthVar,
  flex: flexVar,
})

// Get the keys and sort them by their pixel value. It's important to define breakpoints priority
const orderedBreakpointKeys = Object.keys(consoleLightTheme.breakpoints).sort(
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
    gap: themeSpace,
    flexDirection: ['column', 'row', 'row-reverse', 'column-reverse'],
    alignItems: alignItemsValues,
    justifyContent: justifyContentValues,
    flexWrap: ['nowrap', 'wrap', 'wrap-reverse'],
  },
  responsiveArray: ['xxsmall', 'xsmall', 'small', 'medium', 'large'],
})

export const sprinkles = createSprinkles(responsiveProperties)
