import { theme } from '@ultraviolet/themes'
import { createVar, style, styleVariants } from '@vanilla-extract/css'

export const widthSelectInput = createVar()

const INPUT_SIZE_HEIGHT = {
  large: '600',
  medium: '500',
  small: '400', // sizing theme tokens key
} as const

const unitInputNumberBase = style({
  background: 'transparent',
  border: 'none',
  color: theme.colors.neutral.text,
  flex: 1,
  height: '100%',
  outline: 'none',
  paddingLeft: theme.space[2],
  selectors: {
    '&::placeholder': {
      color: theme.colors.neutral.textWeak,
    },
    '&:disabled': {
      cursor: 'not-allowed',
    },
    '&:disabled::placeholder': {
      color: theme.colors.neutral.textWeakDisabled,
    },
    '&:focus': {
      outline: 'none',
    },
  },
  width: '100%',
})

export const unitInputNumber = styleVariants({
  large: [unitInputNumberBase, { fontSize: theme.typography.body.fontSize }],
  medium: [unitInputNumberBase],
  small: [unitInputNumberBase, { paddingLeft: theme.space[1] }],
})

const unitInputNumberWrapperBase = style({
  border: `1px solid ${theme.colors.neutral.border}`,
  borderRadius: theme.radii.default,
  selectors: {
    '&:focus-within': {
      borderColor: theme.colors.primary.borderHover,
    },
    '&:focus, &:active': {
      borderColor: theme.colors.primary.borderHover,
      boxShadow: theme.shadows.focusPrimary,
    },
    '&:hover, &:focus': {
      borderColor: theme.colors.primary.border,
      textDecoration: 'none',
    },
  },
  width: '100%',
})

export const unitInputState = styleVariants({
  default: [unitInputNumberWrapperBase],
  disabled: [
    unitInputNumberWrapperBase,
    {
      background: theme.colors.neutral.backgroundDisabled,
      borderColor: theme.colors.neutral.borderDisabled,
      cursor: 'not-allowed',
      selectors: {
        '&:active, &:focus, &:focus-within, &:hover': {
          borderColor: theme.colors.neutral.borderDisabled,
          boxShadow: 'none',
        },
      },
    },
  ],
  error: [
    unitInputNumberWrapperBase,
    {
      border: `1px solid ${theme.colors.danger.border}`,
      selectors: {
        '&:active': {
          boxShadow: theme.shadows.focusDanger,
        },
        '&:focus, &:active, &:focus-within, &:hover': {
          border: `1px solid ${theme.colors.danger.border}`,
        },
      },
    },
  ],
  readOnly: [
    unitInputNumberWrapperBase,
    {
      background: theme.colors.neutral.backgroundWeak,
      borderColor: theme.colors.neutral.border,
      cursor: 'default',
      selectors: {
        '&:active, &:focus, &:focus-within, &:hover': {
          borderColor: theme.colors.neutral.borderHover,
          boxShadow: 'none',
        },
      },
    },
  ],
  success: [
    unitInputNumberWrapperBase,
    {
      border: `1px solid ${theme.colors.success.border}`,
      selectors: {
        '&:active': {
          boxShadow: theme.shadows.focusSuccess,
        },
        '&:focus, &:active, &:focus-within, &:hover': {
          border: `1px solid ${theme.colors.success.border}`,
        },
      },
    },
  ],
})

export const unitInputNumberWrapper = style({
  alignItems: 'center',
  borderRight: `1px solid ${theme.colors.neutral.border}`,
  display: 'flex',
  flexDirection: 'row',
  height: '100%',
  paddingRight: theme.space[2],
  selectors: {
    [`${unitInputNumberWrapperBase}:focus > &`]: {
      borderRightColor: theme.colors.primary.border,
    },
    [`${unitInputNumberWrapperBase}:active > &`]: {
      borderRightColor: theme.colors.primary.border,
    },
    [`${unitInputNumberWrapperBase}:focus-within > &`]: {
      borderRightColor: theme.colors.primary.border,
    },
    [`${unitInputNumberWrapperBase}:hover > &`]: {
      borderRightColor: theme.colors.primary.border,
    },
    [`${unitInputState.disabled}:hover > &`]: {
      borderRightColor: theme.colors.neutral.border,
    },
    [`${unitInputState.readOnly}:hover > &`]: {
      borderRightColor: theme.colors.neutral.borderHover,
    },
    [`${unitInputState.success}:hover > &, ${unitInputState.success} > &`]: {
      borderRightColor: theme.colors.success.border,
    },
    [`${unitInputState.error}:hover > &, ${unitInputState.error} > &`]: {
      borderRightColor: theme.colors.danger.border,
    },
  },
  width: '100%',
})

function getSizeUnitInput(size: 'small' | 'medium' | 'large') {
  return {
    height: theme.sizing[INPUT_SIZE_HEIGHT[size]],
    overflow: 'hidden',
  }
}
export const unitInputSize = styleVariants({
  large: getSizeUnitInput('large'),
  medium: getSizeUnitInput('medium'),
  small: getSizeUnitInput('small'),
})

export const unitInputUnitWidth = style({
  width: widthSelectInput,
})

export const unitInputUnit = style({})
