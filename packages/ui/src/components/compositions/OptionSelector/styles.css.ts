import { theme } from '@ultraviolet/themes'
import { style, styleVariants } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { dropdownItemBase } from '../../SelectInput/components/dropdown.css'

const wrapper = recipe({
  base: {
    border: 'none',
  },
  variants: {
    direction: {
      horizontal: {
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: `1fr ${theme.space[4]} 1fr`,
        gap: theme.space['0.5'],
      },
      vertical: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        gap: theme.space[1],
      },
    },
  },
  defaultVariants: {
    direction: 'horizontal',
  },
})

const revealOnHover = style({
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

const firstLabel = style({
  gridColumn: '1',
  gridRow: '1',
})

const secondLabel = style({
  gridColumn: '3',
  gridRow: '1',
})

const firstSelectInput = styleVariants({
  horizontal: {
    gridColumn: '1',
    gridRow: '2',
  },
  vertical: {},
})

const secondSelectInput = styleVariants({
  horizontal: {
    gridColumn: '3',
    gridRow: '2',
  },
  vertical: {},
})

const arrow = styleVariants({
  horizontal: {
    gridColumn: '2',
    gridRow: '2',
    width: '100%',
  },
  vertical: { width: '100%' },
})

const errorFirstSelector = style({
  gridColumn: '1',
  gridRow: '3',
})

const errorSecondSelector = style({
  gridColumn: '3',
  gridRow: '3',
})

export const optionSelectorStyle = {
  arrow,
  errorFirstSelector,
  errorSecondSelector,
  wrapper,
  revealOnHover,
  firstLabel,
  secondLabel,
  firstSelectInput,
  secondSelectInput,
}
