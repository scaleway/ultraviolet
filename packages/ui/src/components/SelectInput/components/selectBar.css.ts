import { theme } from '@ultraviolet/themes'
import { createVar, style, styleVariants } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { INPUT_SIZE_HEIGHT } from '../types'

export const maxWidthTag = createVar({
  inherits: false,
  initialValue: '100%',
  syntax: '*',
})
export const minWidthTag = createVar({
  inherits: false,
  initialValue: 'fit-content',
  syntax: '*',
})

export const selectbarState = styleVariants({
  large: {
    display: 'flex',
    height: theme.sizing[400],
  },
  small: {
    display: 'flex',
    height: theme.sizing[300],
  },
})

export const selectinputPlaceholder = style({
  alignSelf: 'center',
  userSelect: 'none',
})

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
function makeStateStyle(state: 'neutral' | 'success' | 'danger') {
  const correctSentiment = state === 'neutral' ? 'primary' : state

  return {
    selectors: {
      '&:not([data-disabled="true"])': {
        border: `1px solid ${theme.colors[state].border}`,
      },
      '&:not([data-disabled="true"]):not([data-readonly="true"]):active': {
        borderColor: theme.colors[state].borderHover,
        boxShadow: theme.shadows[
          `focus${capitalizeFirstLetter(correctSentiment)}` as keyof typeof theme.shadows
        ] as string,
      },
      '&:not([data-disabled="true"]):not([data-readonly="true"]):focus-visible':
        {
          outline: '5px auto Highlight',
        },
      '&:not([data-disabled="true"]):not([data-readonly="true"]):hover': {
        borderColor: theme.colors[correctSentiment].borderHover,
        outline: 'none',
      },
    },
  }
}

// needed for export
export const selectBarBase = style({
  alignItems: 'center',
  background: theme.colors.neutral.background,
  borderRadius: theme.radii.default,
  boxShadow: 'none',
  cursor: 'pointer',
  display: 'grid',
  gap: theme.space[1],
  gridTemplateColumns: '1fr auto',
  padding: theme.space[1],
  paddingLeft: theme.space[2],
  paddingRight: 0,
  width: '100%',
})

export const selectBar = recipe({
  base: selectBarBase,
  compoundVariants: [
    {
      style: {
        selectors: {
          "&:not([data-disabked='true'])": {
            borderColor: theme.colors.primary.borderHover,
          },
        },
      },
      variants: { dropdownVisible: true, state: 'neutral' },
    },
    {
      style: {
        selectors: {
          "&:not([data-disabked='true'])": {
            borderColor: theme.colors.success.borderHover,
          },
        },
      },
      variants: { dropdownVisible: true, state: 'success' },
    },
    {
      style: {
        selectors: {
          "&:not([data-disabked='true'])": {
            borderColor: theme.colors.danger.borderHover,
          },
        },
      },
      variants: { dropdownVisible: true, state: 'danger' },
    },
  ],
  defaultVariants: {
    disabled: false,
    dropdownVisible: false,
    readOnly: false,
    size: 'large',
    state: 'neutral',
  },
  variants: {
    disabled: {
      true: {
        background: theme.colors.neutral.backgroundDisabled,
        borderColor: theme.colors.neutral.borderDisabled,
        cursor: 'not-allowed',
        selectors: {
          '&:hover': {
            borderColor: theme.colors.neutral.borderDisabled,
          },
        },
      },
    },
    dropdownVisible: {
      true: {
        borderColor: theme.colors.primary.borderHover,
      },
    },

    readOnly: {
      true: {
        background: theme.colors.neutral.backgroundWeak,
        borderColor: theme.colors.neutral.border,
        cursor: 'default',
        selectors: {
          '&:hover': {
            borderColor: theme.colors.neutral.border,
          },
        },
      },
    },
    size: {
      large: {
        height: theme.sizing[INPUT_SIZE_HEIGHT.large],
        paddingInline: theme.space[2],
      },
      medium: {
        height: theme.sizing[INPUT_SIZE_HEIGHT.medium],
        paddingInline: theme.space['1.5'],
      },
      small: {
        height: theme.sizing[INPUT_SIZE_HEIGHT.small],
        padding: 0,
        paddingInline: theme.space[1],
      },
    },
    state: {
      danger: makeStateStyle('danger'),
      neutral: makeStateStyle('neutral'),
      success: makeStateStyle('success'),
    },
  },
})

const selectBarTagsBase = style({
  height: 'max-content',
  maxWidth: maxWidthTag,
  minWidth: minWidthTag,
  width: 'fit-content',
})

export const selectBarTags = styleVariants({
  hidden: [selectBarTagsBase, { visibility: 'hidden' }],
  visible: [
    selectBarTagsBase,
    { overflow: 'hidden', textOverflow: 'ellipsis' },
  ],
})

export const selectedValues = style({
  alignSelf: 'center',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

export const plusTag = style({ width: theme.sizing[500] })

export const multiselectStack = style({
  height: '100%',
  maxWidth: '100%',
  overflow: 'hidden',
})
