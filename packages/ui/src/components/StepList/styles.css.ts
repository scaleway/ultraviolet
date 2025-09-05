import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const steps = style({
  listStyle: 'none',
  paddingLeft: 0,
  textAlign: 'left',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space[3],
  fontSize: theme.typography.body.fontSize,
})

export const step = recipe({
  base: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.space[2],
    justifyContent: 'center',
  },
  variants: {
    disabled: {
      true: {
        color: theme.colors.neutral.textDisabled,
      },
      false: {
        color: theme.colors.neutral.textStrong,
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
      small: {
        lineHeight: '24px',
        fontSize: '16px',
      },
      medium: {
        lineHeight: '32px',
        fontSize: '24px',
      },
    },
  },
})
