import { theme } from '@ultraviolet/themes'
import { style, styleVariants } from '@vanilla-extract/css'
import { INPUT_SIZE_HEIGHT } from './constants'

const flag = style({
  maxWidth: '64px',
  padding: `0 ${theme.space['1.5']}`,
  borderRight: '1px solid',
  borderColor: 'inherit',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'center',
})

const inputWrapperSizes = styleVariants(
  Object.keys(INPUT_SIZE_HEIGHT).reduce<Record<keyof typeof INPUT_SIZE_HEIGHT, { height: string }>>(
    (acc, size) => ({
      ...acc,
      [size]: {
        height: theme.sizing[INPUT_SIZE_HEIGHT[size as keyof typeof INPUT_SIZE_HEIGHT]],
      },
    }),
    {} as Record<keyof typeof INPUT_SIZE_HEIGHT, { height: string }>,
  ),
)

const inputWrapper = style({
  alignItems: 'center',
  background: theme.colors.neutral.background,
  borderRadius: theme.radii.default,
  border: `1px solid ${theme.colors.neutral.border}`,
  display: 'flex',
  flexDirection: 'row',
  selectors: {
    '&:not([data-disabled="true"]):not([data-readonly="true"]):hover': {
      borderColor: theme.colors.primary.border,
    },
    "&[data-disabled='true']": {
      background: theme.colors.neutral.backgroundDisabled,
      borderColor: theme.colors.neutral.borderDisabled,
    },
    '&[data-error="true"]': {
      borderColor: theme.colors.danger.border,
      color: theme.colors.danger.text,
    },
    '&:focus-within': {
      border: `1px solid ${theme.colors.primary.border}`,
      boxShadow: theme.shadows.focusPrimary,
    },
    "&[data-readonly='true']": {
      background: theme.colors.neutral.backgroundWeak,
      borderColor: theme.colors.neutral.border,
    },
    "&[data-success='true']": {
      borderColor: theme.colors.success.border,
    },
  },
  width: '100%',
})

const input = style({
  flex: 1,
  border: 'none',
  outline: 'none',
  height: '100%',
  width: '100%',
  paddingLeft: theme.space['2'],
  background: theme.colors.neutral.background,
  color: theme.colors.neutral.text,
  borderRadius: theme.radii.default,
  selectors: {
    '&[data-size="large"]': {
      fontSize: theme.typography.body.fontSize,
    },
    '&[data-size="small"]': {
      paddingLeft: theme.space['1'],
    },
    '&::placeholder': {
      color: theme.colors.neutral.textWeak,
    },
    '&:disabled': {
      cursor: 'not-allowed',
      pointerEvents: 'none',
      backgroundColor: 'inherit',
    },
    '&:focus': {
      outline: 'none',
    },
    [`${inputWrapper} > &`]: {
      color: theme.colors.neutral.text,
    },
    [`${inputWrapper} > &::placeholder`]: {
      color: theme.colors.neutral.textWeak,
    },
    [`${inputWrapper}[data-disabled='true'] > &`]: {
      color: theme.colors.neutral.textDisabled,
    },
    [`${inputWrapper}[data-disabled='true'] > &::placeholder`]: {
      color: theme.colors.neutral.textWeakDisabled,
    },
  },
})

export const phoneInputStyle = {
  flag,
  inputWrapper,
  inputWrapperSizes,
  input,
}
