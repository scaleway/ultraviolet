import { theme } from '@ultraviolet/themes'
import { globalStyle, style } from '@vanilla-extract/css'
import { basicPrefix, basicSuffix, inputClass } from '../TextInput/styles.css'

export const searchInputPopup = style({
  background: theme.colors.other.elevation.background.raised,
  boxShadow: `${theme.shadows.raised[0]}, ${theme.shadows.raised[1]}`,
  minWidth: '38.125rem',
  padding: `${theme.space['2']} ${theme.space['1']}`,
  textAlign: 'initial',
  width: '100%',
})

export const searchInput = style({})

globalStyle(`${searchInput} ${basicPrefix}, ${searchInput} ${basicSuffix}`, {
  border: 'none',
})

globalStyle(`${searchInput} ${inputClass}`, {
  padding: 0,
})

export const clickableStack = style({ cursor: 'text' })
