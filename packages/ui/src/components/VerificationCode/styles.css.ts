import { theme } from '@ultraviolet/themes'
import { style, styleVariants } from '@vanilla-extract/css'
import { SIZE_HEIGHT, SIZE_WIDTH } from './constants'

export const inputSizes = styleVariants({
  large: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: theme.typography.body.weight,
    height: theme.sizing[SIZE_HEIGHT.large],
    width: theme.sizing[SIZE_WIDTH.large],
  },
  medium: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: theme.typography.body.weight,
    height: theme.sizing[SIZE_HEIGHT.medium],
    width: theme.sizing[SIZE_WIDTH.medium],
  },
  small: {
    fontSize: theme.typography.caption.fontSize,
    fontWeight: theme.typography.caption.weight,
    height: theme.sizing[SIZE_HEIGHT.small],
    width: theme.sizing[SIZE_WIDTH.small],
  },
  xlarge: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: theme.typography.body.weight,
    height: theme.sizing[SIZE_HEIGHT.xlarge],
    width: theme.sizing[SIZE_WIDTH.xlarge],
  },
})

export const inputClass = style({
  background: theme.colors.neutral.background,
  border: `solid 1px ${theme.colors.neutral.border}`,
  borderRadius: theme.radii.default,
  color: theme.colors.neutral.text,
  marginRight: theme.space['1'],
  outlineStyle: 'none',
  selectors: {
    '&::placeholder': {
      color: theme.colors.neutral.textWeak,
    },
    '&:disabled': {
      background: theme.colors.neutral.backgroundDisabled,
      border: `solid 1px ${theme.colors.neutral.borderDisabled}`,
      color: theme.colors.neutral.textDisabled,
      cursor: 'not-allowed',
    },
    '&:disabled::placeholder': {
      color: theme.colors.neutral.textWeakDisabled,
    },
    '&:focus': {
      boxShadow: theme.shadows.focusPrimary,
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
    '&:last-child': {
      marginRight: 0,
    },
    '&[aria-invalid="true"]': {
      borderColor: theme.colors.danger.border,
    },
    '&[data-success="true"]': {
      borderColor: theme.colors.success.border,
    },
  },
  textAlign: 'center',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
})

export const filedSetClass = style({
  border: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space['0.5'],
  margin: 0,
  padding: 0,
})
