import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'

export const hereText = style({
  cursor: 'pointer',
  selectors: {
    '&:hover': {
      textDecoration: 'underline',
    },
  },
})

export const promptContainer = style({
  padding: theme.space[3],
  paddingBottom: theme.space[1],
  background: theme.colors.neutral.backgroundWeak,
  border: `1px solid ${theme.colors.neutral.border}`,
})
export const promptInput = style({
  width: 500,
})
