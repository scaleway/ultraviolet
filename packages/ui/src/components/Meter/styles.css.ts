import { theme } from '@ultraviolet/themes'
import { createVar, style } from '@vanilla-extract/css'

export const colorMeter = createVar()

export const strengthMeter = style({
  color: colorMeter,
  float: 'right',
  verticalAlign: 'top',
})

export const wrapperMeter = style({
  backgroundColor: theme.colors.neutral.backgroundDisabled,
  borderRadius: theme.radii.default,
  height: theme.space[1],
  marginTop: theme.space[1],
})

export const meter = style({
  borderRadius: theme.radii.default,
  height: '100%',
  transition: 'all 0.5s',
})
