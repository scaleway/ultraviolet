import { style, styleVariants } from '@vanilla-extract/css'
import { theme } from '@ultraviolet/themes'
import { SIZE_HEIGHT, SIZE_WIDTH } from './constants'

export const inputSizes = styleVariants({
  small: {
    fontSize: theme.typography.caption.fontSize,
    fontWeight: theme.typography.caption.weight,
    width: theme.sizing[SIZE_WIDTH.small],
    height: theme.sizing[SIZE_HEIGHT.small],
  },
  medium: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: theme.typography.body.weight,
    width: theme.sizing[SIZE_WIDTH.medium],
    height: theme.sizing[SIZE_HEIGHT.medium],
  },
  large: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: theme.typography.body.weight,
    width: theme.sizing[SIZE_WIDTH.large],
    height: theme.sizing[SIZE_HEIGHT.large],
  },
  xlarge: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: theme.typography.body.weight,
    width: theme.sizing[SIZE_WIDTH.xlarge],
    height: theme.sizing[SIZE_HEIGHT.xlarge],
  },
})

export const inputClass = style({
  background: theme.colors.neutral.background,
  color: theme.colors.neutral.text,
  textAlign: 'center',
  borderRadius: theme.radii.default,
  marginRight: theme.space['1'],
  outlineStyle: 'none',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  border: `solid 1px ${theme.colors.neutral.border}`,
  selectors: {
    '&[aria-invalid="true"]': {
      borderColor: theme.colors.danger.border,
    },
    '&[data-success="true"]': {
      borderColor: theme.colors.success.border,
    },
    '&:hover, &:focus': {
      borderColor: theme.colors.primary.borderHover,
    },
    '&:hover[aria-invalid="true"], &:focus[aria-invalid="true"]': {
      borderColor: theme.colors.danger.borderHover,
    },
    '&:hover[data-success="true"], &:focus[data-success="true"]': {
      borderColor: theme.colors.success.borderHover,
    },
    '&:focus': {
      boxShadow: theme.shadows.focusPrimary,
    },
    '&:last-child': {
      marginRight: 0,
    },
    '&::placeholder': {
      color: theme.colors.neutral.textWeak,
    },
    '&:disabled': {
      cursor: 'not-allowed',
      background: theme.colors.neutral.backgroundDisabled,
      color: theme.colors.neutral.textDisabled,
      border: `solid 1px ${theme.colors.neutral.borderDisabled}`,
    },
    '&:disabled::placeholder': {
      color: theme.colors.neutral.textWeakDisabled,
    },
  },
})

export const filedSetClass = style({
  border: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space['0.5'],
})
