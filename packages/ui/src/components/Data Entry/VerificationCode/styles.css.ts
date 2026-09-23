import { theme } from '@ultraviolet/themes'
import { keyframes, style, styleVariants } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { SIZE_HEIGHT, SIZE_WIDTH } from './constants'

const caretBlink = keyframes({
  '0%, 100%': {
    opacity: 1,
  },
  '50%': {
    opacity: 0,
  },
})

const boxSizes = styleVariants({
  large: {
    height: theme.sizing[SIZE_HEIGHT.large],
    width: theme.sizing[SIZE_WIDTH.large],
  },
  medium: {
    height: theme.sizing[SIZE_HEIGHT.medium],
    width: theme.sizing[SIZE_WIDTH.medium],
  },
  small: {
    height: theme.sizing[SIZE_HEIGHT.small],
    width: theme.sizing[SIZE_WIDTH.small],
  },
  xlarge: {
    height: theme.sizing[SIZE_HEIGHT.xlarge],
    width: theme.sizing[SIZE_WIDTH.xlarge],
  },
})

const boxesWrapper = style({
  display: 'flex',
  position: 'relative',
})

const overlayInput = style({
  background: 'transparent',
  border: 'none',
  inset: 0,
  margin: 0,
  opacity: 0,
  padding: 0,
  position: 'absolute',
  selectors: {
    '&:disabled': {
      cursor: 'not-allowed',
    },
  },
})

const caret = style({
  selectors: {
    [`${boxesWrapper}:focus-within &`]: {
      animation: `${caretBlink} 1s step-end infinite`,
      background: theme.colors.neutral.text,
      height: theme.typography.body.lineHeight,
      left: '50%',
      position: 'absolute',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: 1,
    },
  },
})

const box = recipe({
  base: {
    alignItems: 'center',
    background: theme.colors.neutral.background,
    border: `solid 1px ${theme.colors.neutral.border}`,
    borderRadius: theme.radii.default,
    display: 'flex',
    justifyContent: 'center',
    marginRight: theme.space['1'],
    pointerEvents: 'none',
    position: 'relative',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    selectors: {
      '&:last-child': {
        marginRight: 0,
      },
      'input:disabled ~ &': {
        background: theme.colors.neutral.backgroundDisabled,
        border: `solid 1px ${theme.colors.neutral.borderDisabled}`,
      },
      'input:not(:disabled):hover ~ &': {
        borderColor: theme.colors.primary.borderHover,
      },
    },
  },
  variants: {
    current: {
      true: {
        selectors: {
          [`${boxesWrapper}:focus-within &`]: {
            borderColor: theme.colors.primary.borderHover,
            boxShadow: theme.shadows.focusPrimary,
          },
        },
      },
    },
    success: {
      true: {
        borderColor: theme.colors.success.border,
        selectors: {
          'input:not(:disabled):hover ~ &': { borderColor: theme.colors.success.borderHover },
        },
      },
    },
    error: {
      true: {
        borderColor: theme.colors.danger.border,
        selectors: {
          'input:not(:disabled):hover ~ &': { borderColor: theme.colors.danger.borderHover },
        },
      },
    },
  },
  defaultVariants: {
    current: false,
    error: false,
    success: false,
  },
})

export const verificationCodeStyle = {
  boxSizes,
  box,
  boxesWrapper,
  overlayInput,
  caret,
}
