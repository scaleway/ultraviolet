import { theme } from '@ultraviolet/themes'
import { globalStyle, style, styleVariants } from '@vanilla-extract/css'

export const optionSelectorArrow = styleVariants({
  small: {
    marginTop: `calc(${theme.space[4]} + 1px)`,
  },
  medium: {
    marginTop: `calc(${theme.space[4]} + ${theme.space[0.5]})`,
  },
  large: {
    marginTop: `calc(${theme.space[5]} + ${theme.space[0.25]})`,
  },
})

export const revealOnHover = style({})

globalStyle(`${revealOnHover} [data-visibility="hover"]`, {
  display: 'none',
})
globalStyle(`${revealOnHover} [data-visibility="unhover"]`, {
  display: 'flex',
})

globalStyle(
  `.dropdown-item-uv:hover ${revealOnHover} [data-visibility="hover"],
  .dropdown-item-uv:focus ${revealOnHover} [data-visibility="hover"]`,
  {
    display: 'flex',
  },
)
globalStyle(
  `.dropdown-item-uv:hover ${revealOnHover} [data-visibility="unhover"],
  .dropdown-item-uv:focus ${revealOnHover} [data-visibility="unhover"]`,
  {
    display: 'none',
  },
)
