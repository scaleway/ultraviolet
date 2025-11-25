import { theme } from '@ultraviolet/themes'
import { fadeIn } from '../../utils'
import { createVar, style } from '@vanilla-extract/css'

export const rankActionBar = createVar()

export const stackActionBar = style({
  height: '100%',
  padding: `0 ${theme.space[2]}`,
})

export const actionBar = style({
  animation: `${fadeIn} 0.2s ease-in-out`,
  backgroundColor: theme.colors.other.elevation.background.fixed,
  borderRadius: theme.radii.default,
  boxShadow: `${theme.shadows.fixed[0]}, ${theme.shadows.fixed[1]}`,
  height: theme.sizing[700],
  left: '50%',
  position: 'fixed',
  transform: 'translate(-50%, 0)',
  width: '37.5rem',
  bottom: `calc(${theme.sizing['700']} * ${rankActionBar} + ${theme.space['2']})`,
})
