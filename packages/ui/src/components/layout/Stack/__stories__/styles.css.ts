import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'

export const child = style({
  alignItems: 'center',
  backgroundColor: theme.colors.primary.background,
  border: `1px solid ${theme.colors.primary.border}`,
  borderRadius: theme.radii.default,
  color: theme.colors.primary.text,
  display: 'flex',
  justifyContent: 'center',
  padding: theme.space[1],
  selectors: {
    '&[data-width-full="true"]': {
      width: '100%',
    },
  },
})

export const firstChild = style({
  backgroundColor: theme.colors.info.background,
  border: `1px solid ${theme.colors.info.border}`,
  color: theme.colors.info.text,
})

export const secondChild = style({
  backgroundColor: theme.colors.primary.background,
  border: `1px solid ${theme.colors.primary.border}`,
  color: theme.colors.primary.text,
})

export const thirdChild = style({
  backgroundColor: theme.colors.warning.background,
  border: `1px solid ${theme.colors.warning.border}`,
  color: theme.colors.warning.text,
})
