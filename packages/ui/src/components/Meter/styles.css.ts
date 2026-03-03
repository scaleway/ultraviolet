import { theme } from '@ultraviolet/themes'
import { createVar, style } from '@vanilla-extract/css'

export const colorMeter = createVar()

const strength = style({
  color: colorMeter,
  float: 'right',
  verticalAlign: 'top',
})

const wrapper = style({
  backgroundColor: theme.colors.neutral.backgroundDisabled,
  borderRadius: theme.radii.default,
  height: theme.space[1],
  marginTop: theme.space[1],
})

const meter = style({
  borderRadius: theme.radii.default,
  height: '100%',
  transition: 'all 0.5s',
})

export const meterStyle = { strength, wrapper, meter }
