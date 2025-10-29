import { theme } from '@ultraviolet/themes'
import {
  createVar,
  globalStyle,
  style,
  styleVariants,
} from '@vanilla-extract/css'
import { selectBarBase } from '../SelectInput/components/selectBar.css'

export const widthSelectInput = createVar()

const INPUT_SIZE_HEIGHT = {
  large: '600',
  medium: '500',
  small: '400', // sizing theme tokens key
} as const

const unitInputNumberBase = style({
  flex: 1,
  border: 'none',
  outline: 'none',
  height: '100%',
  width: '100%',
  paddingLeft: theme.space[2],
  background: 'transparent',
  color: theme.colors.neutral.text,
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
})

export const unitInputNumber = styleVariants({
  small: [unitInputNumberBase, { paddingLeft: theme.space[1] }],
  medium: [unitInputNumberBase],
  large: [unitInputNumberBase, { fontSize: theme.typography.body.fontSize }],
})

const unitInputNumberWrapperBase = style({
  width: '100%',
  border: `1px solid ${theme.colors.neutral.border}`,
  borderRadius: theme.radii.default,
  selectors: {
    '&:focus, &:active': {
      boxShadow: theme.shadows.focusPrimary,
      borderColor: theme.colors.primary.borderHover,
    },
    '&:focus-within': {
      borderColor: theme.colors.primary.borderHover,
    },
    '&:hover, &:focus': {
      textDecoration: 'none',
      borderColor: theme.colors.primary.border,
    },
  },
})

export const unitInputState = styleVariants({
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
  default: [unitInputNumberWrapperBase],
})

export const unitInputNumberWrapper = style({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  paddingRight: theme.space[2],
  borderRight: `1px solid ${theme.colors.neutral.border}`,
  width: '100%',
  height: '100%',
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
})

function getSizeUnitInput(size: 'small' | 'medium' | 'large') {
  return {
    height: theme.sizing[INPUT_SIZE_HEIGHT[size]],
    overflow: 'hidden',
  }
}
export const unitInputSize = styleVariants({
  small: getSizeUnitInput('small'),
  medium: getSizeUnitInput('medium'),
  large: getSizeUnitInput('large'),
})

export const unitInputUnitWidth = style({
  width: widthSelectInput,
})

export const unitInputUnit = style({})

globalStyle(`${unitInputUnit} ${selectBarBase}`, {
  border: 'none',
  background: 'transparent',
})

globalStyle(
  `${unitInputUnit} ${selectBarBase}:focus, ${unitInputUnit} ${selectBarBase}:active`,
  {
    boxShadow: 'none',
  },
)
