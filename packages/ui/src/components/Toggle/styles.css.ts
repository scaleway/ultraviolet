import { style } from '@vanilla-extract/css'
import { theme } from '@ultraviolet/themes'
import { recipe } from '@vanilla-extract/recipes'

export const sizes = {
  large: {
    ball: theme.sizing['200'],
    height: theme.sizing['300'],
    width: theme.sizing['600'],
  },
  small: {
    ball: theme.sizing['150'],
    height: theme.sizing['250'],
    width: theme.sizing['500'],
  },
}

export const toggle = recipe({
  base: {
    boxSizing: 'content-box',
    outline: 'none',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    border: 'none',
    borderRadius: theme.radii.xlarge,
    position: 'relative',
    transition: 'all 300ms',
    backgroundColor: theme.colors.neutral.backgroundStrong,
    selectors: {
      '&:after': {
        content: '""',
        position: 'absolute',
        top: `calc(50% - ${theme.sizing['200']} / 2)`,
        left: '5px',
        width: theme.sizing['200'],
        height: theme.sizing['200'],
        borderRadius: theme.radii.circle,
        backgroundColor: theme.colors.neutral.background,
        transition: 'all 300ms',
      },
      '&:focus-within, &:focus': {
        boxShadow: theme.shadows.focusNeutral,
      },
      '&:has(input:checked):after': {
        left: 'calc(100% - 5px)',
        transform: 'translateX(-100%)',
      },
    },
  },
  variants: {
    size: {
      large: {
        width: sizes.large.width,
        height: sizes.large.height,
        selectors: {
          '&:after': {
            width: sizes.large.ball,
            height: sizes.large.ball,
            top: `calc(50% - ${sizes.large.ball} / 2)`,
          },
        },
      },
      small: {
        width: sizes.small.width,
        height: sizes.small.height,
        selectors: {
          '&:after': {
            width: sizes.small.ball,
            height: sizes.small.ball,
            top: `calc(50% - ${sizes.small.ball} / 2)`,
          },
        },
      },
    },
    disabled: {
      true: {
        background: theme.colors.neutral.backgroundStrongDisabled,
        selectors: {
          '&:hover': {
            background: theme.colors.neutral.backgroundStrongDisabled,
          },
          '&:has(input:checked)': {
            color: theme.colors.neutral.textStrongDisabled,
            backgroundColor: theme.colors.primary.backgroundStrongDisabled,
          },
        },
      },
      false: {
        selectors: {
          '&:hover': {
            backgroundColor: theme.colors.neutral.backgroundStrongHover,
          },
          '&:has(input:checked)': {
            color: theme.colors.neutral.textStrong,
            backgroundColor: theme.colors.primary.backgroundStrong,
          },
          '&:has(input:checked):hover': {
            backgroundColor: theme.colors.primary.backgroundStrongHover,
          },
          '&:has(input:checked):focus-within, &:has(input:checked):focus': {
            boxShadow: theme.shadows.focusPrimary,
          },
        },
      },
    },
    error: {
      true: {
        backgroundColor: theme.colors.danger.background,
        selectors: {
          '&:hover': {
            background: theme.colors.danger.backgroundHover,
          },
          '&:has(input:checked):hover': {
            backgroundColor: theme.colors.danger.backgroundStrongHover,
          },
          '&:has(input:checked)': {
            color: theme.colors.danger.textStrong,
            backgroundColor: theme.colors.danger.backgroundStrong,
          },
          '&:has(input:checked):focus-within, &:has(input:checked):focus': {
            boxShadow: theme.shadows.focusDanger,
          },
        },
      },
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { disabled: true, error: true },
      style: {
        backgroundColor: theme.colors.danger.backgroundDisabled,
        selectors: {
          '&:has(input:checked)': {
            color: theme.colors.danger.textStrongDisabled,
            backgroundColor: theme.colors.danger.backgroundStrongDisabled,
          },
        },
      },
    },
  ],
  defaultVariants: {
    size: 'large',
    disabled: false,
    error: false,
  },
})

export const checkbox = style({
  position: 'absolute',
  opacity: 0,
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  cursor: 'pointer',
  selectors: {
    '&[disabled]': {
      cursor: 'not-allowed',
    },
  },
})

export const label = recipe({
  base: {
    display: 'flex',
    gap: theme.space['1'],
    alignItems: 'start',
    width: 'fit-content',
    cursor: 'pointer',
  },
  variants: {
    labelPosition: {
      left: { flexDirection: 'row' },
      right: { flexDirection: 'row-reverse' },
    },
    disabled: {
      true: {
        cursor: 'not-allowed',
        color: theme.colors.neutral.textDisabled,
      },
      false: {},
    },
  },
  defaultVariants: {
    labelPosition: 'right',
    disabled: false,
  },
})
