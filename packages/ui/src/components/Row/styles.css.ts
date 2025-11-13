import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles'
import { consoleLightTheme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'
import { paddings, templateColumn } from './variables.css'
import type { CSSProperties } from 'react'

export const row = style({
  display: 'grid',
  '@media': {
    [`screen and (min-width: ${consoleLightTheme.breakpoints.xlarge})`]: {
      gridTemplateColumns: templateColumn.xlarge,
      padding: paddings.xlarge,
    },
    [`screen and (min-width: ${consoleLightTheme.breakpoints.large}) and (max-width: ${consoleLightTheme.breakpoints.xlarge})`]:
      {
        gridTemplateColumns: templateColumn.xlarge,
        padding: paddings.large,
      },
    [`screen and (min-width: ${consoleLightTheme.breakpoints.medium}) and (max-width: ${consoleLightTheme.breakpoints.large})`]:
      {
        gridTemplateColumns: templateColumn.medium,
        padding: paddings.medium,
      },
    [`screen and (min-width: ${consoleLightTheme.breakpoints.small}) and (max-width: ${consoleLightTheme.breakpoints.medium})`]:
      {
        gridTemplateColumns: templateColumn.small,
        padding: paddings.small,
      },
    [`screen and (min-width: ${consoleLightTheme.breakpoints.xsmall}) and (max-width: ${consoleLightTheme.breakpoints.small})`]:
      {
        gridTemplateColumns: templateColumn.xsmall,
        padding: paddings.xsmall,
      },
    [`screen and (min-width: ${consoleLightTheme.breakpoints.xxsmall}) and (max-width: ${consoleLightTheme.breakpoints.xsmall})`]:
      {
        gridTemplateColumns: templateColumn.xxsmall,
        padding: paddings.xxsmall,
      },
  },
})

const breakpoints = Object.keys(
  consoleLightTheme.breakpoints,
) as (keyof typeof consoleLightTheme.breakpoints)[]

// Get the keys and sort them by their pixel value. It's important to define breakpoints priority
const orderedBreakpointKeys = breakpoints.toSorted(
  (a, b) =>
    Number.parseInt(consoleLightTheme.breakpoints[a], 10) -
    Number.parseInt(consoleLightTheme.breakpoints[b], 10),
)

const themeBreakpoints = orderedBreakpointKeys.reduce(
  (acc, key) => ({
    ...acc,
    [key]: {
      '@media': `screen and (min-width: ${consoleLightTheme.breakpoints[key]})`,
    },
  }),
  {} as Record<
    keyof typeof consoleLightTheme.breakpoints,
    { '@media': string }
  >,
)

const themeSpace = Object.values(consoleLightTheme.space)

const alignItemsValues: CSSProperties['alignItems'][] = [
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

const justifyContentValues: CSSProperties['justifyContent'][] = [
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
