import { style } from '@vanilla-extract/css'
import { theme } from '@ultraviolet/themes'

export const styledDiv = style({
  padding: theme.space[1],
  background: theme.colors.primary.background,
  color: theme.colors.primary.text,
  borderRadius: theme.radii.default,
  border: `1px solid ${theme.colors.primary.border}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  selectors: {
    '&[data-width-full="true"]': {
      width: '100%',
    },
  },
})
