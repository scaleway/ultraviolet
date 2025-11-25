import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'

export const child = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.space[1],
  borderRadius: theme.radii.default,
  color: theme.colors.primary.text,
  border: `1px solid ${theme.colors.primary.border}`,
  backgroundColor: theme.colors.primary.background,
  selectors: {
    '&[data-width-full="true"]': {
      width: '100%',
    },
  },
})

export const firstChild = style({
  backgroundColor: theme.colors.info.background,
  color: theme.colors.info.text,
  border: `1px solid ${theme.colors.info.border}`,
})

export const secondChild = style({
  backgroundColor: theme.colors.primary.background,
  color: theme.colors.primary.text,
  border: `1px solid ${theme.colors.primary.border}`,
})

export const thirdChild = style({
  backgroundColor: theme.colors.warning.background,
  color: theme.colors.warning.text,
  border: `1px solid ${theme.colors.warning.border}`,
})
