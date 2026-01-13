import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'

export const stackCard = style({
  selectors: {
    "&[data-disabled='true']": {
      cursor: 'not-allowed',
    },
  },
})

export const borderedBox = style({
  border: `1px solid ${theme.colors.neutral.border}`,
  borderRadius: theme.radii.default,
  flex: '1 1 auto',
  padding: theme.space[3],
  selectors: {
    "&[data-disabled='true']": {
      border: `1px solid ${theme.colors.neutral.borderDisabled}`,
    },
    "&[data-is-active='true']": {
      border: `1px solid ${theme.colors.primary.border}`,
    },
  },
})
