import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles'
import { consoleLightTheme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'
import {
  paddingLarge,
  paddingMedium,
  paddingSmall,
  paddingXlarge,
  paddingXsmall,
  paddingXxsmall,
  templateColumnsLarge,
  templateColumnsMedium,
  templateColumnsSmall,
  templateColumnsXlarge,
  templateColumnsXsmall,
  templateColumnsXxsmall,
} from './variables.css'

export const row = style({
  display: 'grid',
  '@media': {
    [`screen and (min-width: ${consoleLightTheme.breakpoints.xlarge})`]: {
      gridTemplateColumns: templateColumnsXlarge,
      padding: paddingXlarge,
    },
    [`screen and (min-width: ${consoleLightTheme.breakpoints.large}) and (max-width: ${consoleLightTheme.breakpoints.xlarge})`]:
      {
        gridTemplateColumns: templateColumnsLarge,
        padding: paddingLarge,
      },
    [`screen and (min-width: ${consoleLightTheme.breakpoints.medium}) and (max-width: ${consoleLightTheme.breakpoints.large})`]:
      {
        gridTemplateColumns: templateColumnsMedium,
        padding: paddingMedium,
      },
    [`screen and (min-width: ${consoleLightTheme.breakpoints.small}) and (max-width: ${consoleLightTheme.breakpoints.medium})`]:
      {
        gridTemplateColumns: templateColumnsSmall,
        padding: paddingSmall,
      },
    [`screen and (min-width: ${consoleLightTheme.breakpoints.xsmall}) and (max-width: ${consoleLightTheme.breakpoints.small})`]:
      {
        gridTemplateColumns: templateColumnsXsmall,
        padding: paddingXsmall,
      },
    [`screen and (min-width: ${consoleLightTheme.breakpoints.xxsmall}) and (max-width: ${consoleLightTheme.breakpoints.xsmall})`]:
      {
        gridTemplateColumns: templateColumnsXxsmall,
        padding: paddingXxsmall,
      },
  },
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
    alignItems: alignItemsValues,
    justifyContent: justifyContentValues,
  },
  responsiveArray: ['xxsmall', 'xsmall', 'small', 'medium', 'large'],
})

export const sprinkles = createSprinkles(responsiveProperties)
