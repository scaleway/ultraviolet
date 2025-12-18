import { theme } from '@ultraviolet/themes'
import { globalStyle, style, styleVariants } from '@vanilla-extract/css'

export const optionSelectorArrow = styleVariants({
  small: {
    marginTop: theme.space[4],
  },
  medium: {
    marginTop: theme.space[4],
  },
  large: {
    marginTop: theme.space[5],
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
