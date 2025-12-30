import { theme } from '@ultraviolet/themes'
import { createVar, style, styleVariants } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { INPUT_SIZE_HEIGHT } from '../types'

export const maxWidthTag = createVar({
  syntax: '*',
  inherits: false,
  initialValue: '100%',
})
export const minWidthTag = createVar({
  syntax: '*',
  inherits: false,
  initialValue: 'fit-content',
})

export const selectbarState = styleVariants({
  small: {
    display: 'flex',
    height: theme.sizing[300],
  },
  large: {
    display: 'flex',
    height: theme.sizing[400],
  },
})

export const selectinputPlaceholder = style({
  userSelect: 'none',
  alignSelf: 'center',
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
      '&:not([data-disabled="true"]):not([data-readonly="true"]):hover': {
        borderColor: theme.colors[correctSentiment].borderHover,
        outline: 'none',
      },
      '&:not([data-disabled="true"]):not([data-readonly="true"]):focus-visible':
        {
          outline: '5px auto Highlight',
        },
    },
  }
}

// needed for export
export const selectBarBase = style({
  display: 'grid',
  width: '100%',
  gap: theme.space[1],
  gridTemplateColumns: '1fr auto',
  padding: theme.space[1],
  paddingRight: 0,
  paddingLeft: theme.space[2],
  cursor: 'pointer',
  boxShadow: 'none',
  background: theme.colors.neutral.background,
  borderRadius: theme.radii.default,
  alignItems: 'center',
})

export const selectBar = recipe({
  base: selectBarBase,
  variants: {
    size: {
      small: {
        height: theme.sizing[INPUT_SIZE_HEIGHT.small],
        padding: 0,
        paddingInline: theme.space[1],
      },
      medium: {
        height: theme.sizing[INPUT_SIZE_HEIGHT.medium],
        paddingInline: theme.space['1.5'],
      },
      large: {
        height: theme.sizing[INPUT_SIZE_HEIGHT.large],
        paddingInline: theme.space[2],
      },
    },
    state: {
      neutral: makeStateStyle('neutral'),
      success: makeStateStyle('success'),
      danger: makeStateStyle('danger'),
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
  },
  compoundVariants: [
    {
      variants: { dropdownVisible: true, state: 'neutral' },
      style: {
        selectors: {
          "&:not([data-disabked='true'])": {
            borderColor: theme.colors.primary.borderHover,
          },
        },
      },
    },
    {
      variants: { dropdownVisible: true, state: 'success' },
      style: {
        selectors: {
          "&:not([data-disabked='true'])": {
            borderColor: theme.colors.success.borderHover,
          },
        },
      },
    },
    {
      variants: { dropdownVisible: true, state: 'danger' },
      style: {
        selectors: {
          "&:not([data-disabked='true'])": {
            borderColor: theme.colors.danger.borderHover,
          },
        },
      },
    },
  ],
  defaultVariants: {
    state: 'neutral',
    size: 'large',
    dropdownVisible: false,
    readOnly: false,
    disabled: false,
  },
})

const selectBarTagsBase = style({
  height: 'max-content',
  width: 'fit-content',
  minWidth: minWidthTag,
  maxWidth: maxWidthTag,
})

export const selectBarTags = styleVariants({
  hidden: [selectBarTagsBase, { visibility: 'hidden' }],
  visible: [
    selectBarTagsBase,
    { textOverflow: 'ellipsis', overflow: 'hidden' },
  ],
})

export const selectedValues = style({
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  alignSelf: 'center',
})

export const plusTag = style({ width: theme.sizing[500] })

export const multiselectStack = style({
  overflow: 'hidden',
  maxWidth: '100%',
  height: '100%',
})
