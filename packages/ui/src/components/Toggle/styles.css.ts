import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'
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
    alignItems: 'center',
    backgroundColor: theme.colors.neutral.backgroundStrong,
    border: 'none',
    borderRadius: theme.radii.xlarge,
    boxSizing: 'content-box',
    display: 'flex',
    outline: 'none',
    overflow: 'hidden',
    position: 'relative',
    selectors: {
      '&:after': {
        backgroundColor: theme.colors.neutral.background,
        borderRadius: theme.radii.circle,
        content: '""',
        height: theme.sizing['200'],
        left: '5px',
        position: 'absolute',
        top: `calc(50% - ${theme.sizing['200']} / 2)`,
        transition: 'all 300ms',
        width: theme.sizing['200'],
      },
      '&:focus-within, &:focus': {
        boxShadow: theme.shadows.focusNeutral,
      },
      '&:has(input:checked):after': {
        left: 'calc(100% - 5px)',
        transform: 'translateX(-100%)',
      },
    },
    transition: 'all 300ms',
  },
  compoundVariants: [
    {
      style: {
        backgroundColor: theme.colors.danger.backgroundDisabled,
        selectors: {
          '&:has(input:checked)': {
            backgroundColor: theme.colors.danger.backgroundStrongDisabled,
            color: theme.colors.danger.textStrongDisabled,
          },
        },
      },
      variants: { disabled: true, error: true },
    },
  ],
  defaultVariants: {
    disabled: false,
    error: false,
    size: 'large',
  },
  variants: {
    disabled: {
      false: {
        selectors: {
          '&:has(input:checked)': {
            backgroundColor: theme.colors.primary.backgroundStrong,
            color: theme.colors.neutral.textStrong,
          },
          '&:has(input:checked):focus-within, &:has(input:checked):focus': {
            boxShadow: theme.shadows.focusPrimary,
          },
          '&:has(input:checked):hover': {
            backgroundColor: theme.colors.primary.backgroundStrongHover,
          },
          '&:hover': {
            backgroundColor: theme.colors.neutral.backgroundStrongHover,
          },
        },
      },
      true: {
        background: theme.colors.neutral.backgroundStrongDisabled,
        selectors: {
          '&:has(input:checked)': {
            backgroundColor: theme.colors.primary.backgroundStrongDisabled,
            color: theme.colors.neutral.textStrongDisabled,
          },
          '&:hover': {
            background: theme.colors.neutral.backgroundStrongDisabled,
          },
        },
      },
    },
    error: {
      false: {},
      true: {
        backgroundColor: theme.colors.danger.background,
        selectors: {
          '&:has(input:checked)': {
            backgroundColor: theme.colors.danger.backgroundStrong,
            color: theme.colors.danger.textStrong,
          },
          '&:has(input:checked):focus-within, &:has(input:checked):focus': {
            boxShadow: theme.shadows.focusDanger,
          },
          '&:has(input:checked):hover': {
            backgroundColor: theme.colors.danger.backgroundStrongHover,
          },
          '&:hover': {
            background: theme.colors.danger.backgroundHover,
          },
        },
      },
    },
    size: {
      large: {
        height: sizes.large.height,
        selectors: {
          '&:after': {
            height: sizes.large.ball,
            top: `calc(50% - ${sizes.large.ball} / 2)`,
            width: sizes.large.ball,
          },
        },
        width: sizes.large.width,
      },
      small: {
        height: sizes.small.height,
        selectors: {
          '&:after': {
            height: sizes.small.ball,
            top: `calc(50% - ${sizes.small.ball} / 2)`,
            width: sizes.small.ball,
          },
        },
        width: sizes.small.width,
      },
    },
  },
})

export const checkbox = style({
  cursor: 'pointer',
  height: '100%',
  left: 0,
  opacity: 0,
  position: 'absolute',
  selectors: {
    '&[disabled]': {
      cursor: 'not-allowed',
    },
  },
  top: 0,
  width: '100%',
})

export const label = recipe({
  base: {
    alignItems: 'start',
    cursor: 'pointer',
    display: 'flex',
    gap: theme.space['1'],
    width: 'fit-content',
  },
  defaultVariants: {
    disabled: false,
    labelPosition: 'right',
  },
  variants: {
    disabled: {
      false: {},
      true: {
        color: theme.colors.neutral.textDisabled,
        cursor: 'not-allowed',
      },
    },
    labelPosition: {
      left: { flexDirection: 'row' },
      right: { flexDirection: 'row-reverse' },
    },
  },
})
