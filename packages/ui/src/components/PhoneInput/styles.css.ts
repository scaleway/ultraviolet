import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'

const flag = style({
  maxWidth: '64px',
})

const text = style({
  marginLeft: theme.space['1'],
})

const span = style({
  position: 'absolute',
  top: '-12px',
  left: '12px',
  fontSize: '13px',
  padding: `0 ${theme.space['2']}`,
  backgroundColor: theme.colors.other.elevation.background.overlay,
})

const label = style({
  height: '48px',
  position: 'relative',
  display: 'flex',
  borderRadius: '4px',
  alignItems: 'center',
  border: `1px solid ${theme.colors.neutral.borderWeak}`,
  padding: `${theme.space['1']} ${theme.space['1']}`,
  gap: theme.space['1'],
  selectors: {
    '&[data-disabled="true"]': {
      color: theme.colors.neutral.textDisabled,
      borderColor: theme.colors.neutral.borderDisabled,
      cursor: 'not-allowed',
    },
    '&[data-error="true"]': {
      borderColor: theme.colors.danger.border,
      color: theme.colors.danger.text,
    },
    '&:focus-within': {
      border: `1px solid ${theme.colors.primary.border}`,
      boxShadow: theme.shadows.focusPrimary,
    },
  },
})

const error = style({
  paddingTop: theme.space['0.25'],
})

const input = style({
  height: '100%',
  border: 'none',
  outline: 'none',
  width: '100%',
  background: theme.colors.neutral.background,
  color: theme.colors.neutral.text,
  selectors: {
    '&::placeholder': {
      color: theme.colors.neutral.textWeak,
    },
    '&:disabled': {
      cursor: 'not-allowed',
      pointerEvents: 'none',
      backgroundColor: 'inherit',
    },
  },
})

export const phoneInputStyle = {
  flag,
  text,
  span,
  label,
  error,
  input,
}
