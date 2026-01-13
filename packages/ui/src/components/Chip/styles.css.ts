import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'

export const buttonContainer = style({
  background: 'none',
  border: 'none',
  borderRadius: theme.radii.default,
  cursor: 'pointer',
  padding: 0,

  selectors: {
    '&[data-disabled="true"]': {
      cursor: 'not-allowed',
    },
    '&[data-has-onclick="true"][data-active="false"]:hover': {
      backgroundColor: theme.colors.neutral.backgroundStrongHover,
    },
    '&[data-has-onclick="true"][data-active="true"]:hover': {
      backgroundColor: theme.colors.primary.backgroundStrong,
    },
  },
})

export const container = style({
  backgroundColor: theme.colors.neutral.background,
  border: `1px solid ${theme.colors.neutral.borderWeak}`,
  borderRadius: theme.radii.xlarge,
  color: theme.colors.neutral.text,
  cursor: 'pointer',
  display: 'flex',
  padding: `${theme.space['0.5']} ${theme.space['2']}`,

  selectors: {
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
    '&[data-size="large"]': {
      height: theme.space[4],
      padding: `${theme.space['0.5']} ${theme.space['2']}`,
    },
    '&[data-size="medium"]': {
      height: theme.space[3],
      padding: `${theme.space['0.5']} ${theme.space['1.5']}`,
    },
    '&[data-trailing-icon="true"]': {
      paddingRight: theme.space[1],
    },
  },
  textAlign: 'center',
  userSelect: 'none',
  width: 'fit-content',
})
