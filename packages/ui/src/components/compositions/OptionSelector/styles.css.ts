import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'
import { dropdownItemBase } from '../../SelectInput/components/dropdown.css'

export const optionSelectorWrapper = style({
  alignItems: 'center',
  border: 'none',
  display: 'grid',
  gap: theme.space[2],
  gridTemplateColumns: `1fr ${theme.space[4]} 1fr`,
})

export const revealOnHover = style({
  selectors: {
    "&[data-visibility='hover']": {
      display: 'none',
    },
    '&[data-visibility="unhover"]': {
      display: 'flex',
    },
    [`${dropdownItemBase}:hover &[data-visibility="hover"],
  ${dropdownItemBase}:focus &[data-visibility="hover"]`]: {
      display: 'flex',
    },
    [`${dropdownItemBase}:hover &[data-visibility="unhover"],
  ${dropdownItemBase}:focus &[data-visibility="unhover"]`]: {
      display: 'none',
    },
  },
})

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
