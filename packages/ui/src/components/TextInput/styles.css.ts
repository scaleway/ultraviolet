import { theme } from '@ultraviolet/themes'
import { createVar, style, styleVariants } from '@vanilla-extract/css'
import { searchInput } from '../SearchInput/styles.css'
import { TEXTINPUT_SIZE_HEIGHT } from './constants'

export const hasFocusVar = createVar()

export const basicPrefix = style({
  padding: theme.space['2'],
  borderRight: '1px solid',
  borderColor: 'inherit',
  height: '100%',

  selectors: {
    '&[data-size="small"]': { padding: theme.space['1'] },
    [`${searchInput} &`]: {
      border: 'none',
    },
  },
})

export const stateStack = style({
  padding: `0 ${theme.space['2']}`,
})

export const basicSuffix = style({
  padding: `0 ${theme.space['2']}`,
  borderLeft: '1px solid',
  borderColor: 'inherit',
  height: '100%',
  selectors: {
    [`${searchInput} &`]: {
      border: 'none',
    },
  },
})

export const ctaSuffix = style({
  padding: `0 ${theme.space['1']}`,
  borderLeft: '1px solid',
  borderColor: 'inherit',
  height: '100%',
})

export const inputWrapperSizes = styleVariants(
  Object.keys(TEXTINPUT_SIZE_HEIGHT).reduce(
    (acc, size) => ({
      ...acc,
      [size]: {
        height:
          theme.sizing[
            TEXTINPUT_SIZE_HEIGHT[size as keyof typeof TEXTINPUT_SIZE_HEIGHT]
          ],
      },
    }),
    {} as Record<keyof typeof TEXTINPUT_SIZE_HEIGHT, { height: string }>,
  ),
)

export const inputWrapper = style({
  alignItems: 'center',
  background: theme.colors.neutral.background,
  border: `1px solid ${theme.colors.neutral.border}`,
  borderRadius: theme.radii.default,
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
    "&[data-error='true']": {
      borderColor: theme.colors.danger.border,
    },
    "&[data-has-focus='true']": {
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

export const inputClass = style({
  flex: 1,
  border: 'none',
  outline: 'none',
  height: '100%',
  width: '100%',
  paddingLeft: theme.space['2'],
  background: 'transparent',
  fontSize: theme.typography.bodySmall.fontSize,

  selectors: {
    '&[data-size="large"]': {
      fontSize: theme.typography.body.fontSize,
    },
    '&[data-size="small"]': {
      paddingLeft: theme.space['1'],
    },
    '&:disabled': {
      cursor: 'not-allowed',
      userSelect: 'none',
    },
    '&:focus': {
      outline: 'none',
    },
    [`${searchInput} &`]: {
      padding: 0,
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
