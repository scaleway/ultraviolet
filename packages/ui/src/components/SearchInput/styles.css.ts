import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'

const popup = style({
  background: theme.colors.other.elevation.background.raised,
  boxShadow: `${theme.shadows.raised[0]}, ${theme.shadows.raised[1]}`,
  minWidth: '38.125rem',
  padding: `${theme.space['2']} ${theme.space['1']}`,
  textAlign: 'initial',
  width: '100%',
})

const searchInput = style({})

const clickableStack = style({ cursor: 'text' })

export const searchInputStyle = {
  popup,
  searchInput,
  clickableStack,
}
