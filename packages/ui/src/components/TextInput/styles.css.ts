import { theme } from '@ultraviolet/themes'
import {
  createVar,
  globalStyle,
  style,
  styleVariants,
} from '@vanilla-extract/css'
import { TEXTINPUT_SIZE_HEIGHT } from './constants'

export const hasFocusVar = createVar()

export const basicPrefix = style({
  borderColor: 'inherit',
  borderRight: '1px solid',
  height: '100%',
  padding: theme.space['2'],

  selectors: {
    '&[data-size="small"]': {
      padding: theme.space['1'],
    },
  },
})

export const stateStack = style({
  padding: `0 ${theme.space['2']}`,
})

export const basicSuffix = style({
  borderColor: 'inherit',
  borderLeft: '1px solid',
  height: '100%',
  padding: `0 ${theme.space['2']}`,
})

export const ctaSuffix = style({
  borderColor: 'inherit',
  borderLeft: '1px solid',
  height: '100%',
  padding: `0 ${theme.space['1']}`,
})

export const inputClass = style({
  background: 'transparent',
  border: 'none',
  flex: 1,
  fontSize: theme.typography.bodySmall.fontSize,
  height: '100%',
  outline: 'none',
  paddingLeft: theme.space['2'],

  selectors: {
    '&:disabled': {
      cursor: 'not-allowed',
      userSelect: 'none',
    },
    '&:focus': {
      outline: 'none',
    },
    '&[data-size="large"]': {
      fontSize: theme.typography.body.fontSize,
    },
    '&[data-size="small"]': {
      paddingLeft: theme.space['1'],
    },
  },
  width: '100%',
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

globalStyle(`${inputWrapper} > ${inputClass}`, {
  color: theme.colors.neutral.text,
})

globalStyle(`${inputWrapper} > ${inputClass}::placeholder`, {
  color: theme.colors.neutral.textWeak,
})

globalStyle(`${inputWrapper}[data-disabled='true'] > ${inputClass}`, {
  color: theme.colors.neutral.textDisabled,
})

globalStyle(
  `${inputWrapper}[data-disabled='true'] > ${inputClass}::placeholder`,
  {
    color: theme.colors.neutral.textWeakDisabled,
  },
)
