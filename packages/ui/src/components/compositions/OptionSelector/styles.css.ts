import { theme } from '@ultraviolet/themes'
import { globalStyle, style } from '@vanilla-extract/css'
import { dropdownItemBase } from '../../SelectInput/components/dropdown.css'

export const optionSelectorWrapper = style({
  alignItems: 'center',
  border: 'none',
  display: 'grid',
  gap: theme.space[2],
  gridTemplateColumns: `1fr ${theme.space[4]} 1fr`,
})

export const revealOnHover = style({})

globalStyle(`${revealOnHover} [data-visibility="hover"]`, {
  display: 'none',
})
globalStyle(`${revealOnHover} [data-visibility="unhover"]`, {
  display: 'flex',
})

globalStyle(
  `${dropdownItemBase}:hover ${revealOnHover} [data-visibility="hover"],
  ${dropdownItemBase}:focus ${revealOnHover} [data-visibility="hover"]`,
  {
    display: 'flex',
  },
)
globalStyle(
  `${dropdownItemBase}:hover ${revealOnHover} [data-visibility="unhover"],
  ${dropdownItemBase}:focus ${revealOnHover} [data-visibility="unhover"]`,
  {
    display: 'none',
  },
)

export const firstLabel = style({
  gridColumn: '1',
  gridRow: '1',
})

export const secondLabel = style({
  gridColumn: '3',
  gridRow: '1',
})

export const firstSelectInput = style({
  gridColumn: '1',
  gridRow: '2',
})

export const secondSelectInput = style({
  gridColumn: '3',
  gridRow: '2',
})

export const arrow = style({
  gridColumn: '2',
  gridRow: '2',
})

export const errorFirstSelector = style({
  gridColumn: '1',
  gridRow: '3',
  marginTop: `calc(-1 * ${theme.space['1']})`,
})

export const errorSecondSelector = style({
  gridColumn: '3',
  gridRow: '3',
  marginTop: `calc(-1 * ${theme.space['1']})`,
})
