import { style } from '@vanilla-extract/css'
import { theme } from '@ultraviolet/themes'

export const buttonContainer = style({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  borderRadius: theme.radii.default,

  selectors: {
    '&[data-has-onclick="true"][data-active="false"]:hover': {
      backgroundColor: theme.colors.neutral.backgroundStrongHover,
    },
    '&[data-has-onclick="true"][data-active="true"]:hover': {
      backgroundColor: theme.colors.primary.backgroundStrong,
    },
    '&[data-disabled="true"]': {
      cursor: 'not-allowed',
    },
  },
})

export const container = style({
  padding: `${theme.space['0.5']} ${theme.space['2']}`,
  display: 'flex',
  borderRadius: theme.radii.xlarge,
  width: 'fit-content',
  backgroundColor: theme.colors.neutral.background,
  cursor: 'pointer',
  border: `1px solid ${theme.colors.neutral.borderWeak}`,
  textAlign: 'center',
  color: theme.colors.neutral.text,
  userSelect: 'none',

  selectors: {
    '&[data-disabled="false"]:hover': {
      backgroundColor: theme.colors.neutral.backgroundHover,
      borderColor: theme.colors.neutral.borderStrongHover,
      color: theme.colors.neutral.textHover,
    },
    '&[data-disabled="true"]': {
      backgroundColor: theme.colors.neutral.backgroundDisabled,
      borderColor: theme.colors.neutral.borderWeakDisabled,
      color: theme.colors.neutral.textDisabled,
      cursor: 'not-allowed',
    },
    '&[data-active="true"]': {
      backgroundColor: theme.colors.primary.backgroundStrong,
      borderColor: theme.colors.primary.backgroundStrong,
      color: theme.colors.neutral.textStronger,
    },
    '&[data-active="true"][data-disabled="false"]:hover': {
      backgroundColor: theme.colors.primary.backgroundStrongHover,
      borderColor: theme.colors.primary.backgroundStrongHover,
      color: theme.colors.neutral.textStrongerHover,
    },
    '&[data-active="true"][data-disabled="true"]': {
      backgroundColor: theme.colors.primary.backgroundStrongDisabled,
      border: 'none',
    },
    '&[data-size="medium"]': {
      height: theme.space[3],
      padding: `${theme.space['0.5']} ${theme.space['1.5']}`,
    },
    '&[data-size="large"]': {
      height: theme.space[4],
      padding: `${theme.space['0.5']} ${theme.space['2']}`,
    },
    '&[data-trailing-icon="true"]': {
      paddingRight: theme.space[1],
    },
  },
})
