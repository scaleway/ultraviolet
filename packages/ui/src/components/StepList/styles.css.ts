import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const steps = style({
  display: 'flex',
  flexDirection: 'column',
  fontSize: theme.typography.body.fontSize,
  gap: theme.space[3],
  listStyle: 'none',
  paddingLeft: 0,
  textAlign: 'left',
})

export const step = recipe({
  base: {
    alignItems: 'flex-start',
    display: 'flex',
    gap: theme.space[2],
    justifyContent: 'center',
  },
  variants: {
    disabled: {
      false: {
        color: theme.colors.neutral.textStrong,
      },
      true: {
        color: theme.colors.neutral.textDisabled,
      },
    },
  },
})

export const stepDiv = recipe({
  base: {
    flex: 1,
    margin: 'auto',
    minWidth: 0,
  },
  variants: {
    size: {
      medium: {
        fontSize: '24px',
        lineHeight: '32px',
      },
      small: {
        fontSize: '16px',
        lineHeight: '24px',
      },
    },
  },
})
