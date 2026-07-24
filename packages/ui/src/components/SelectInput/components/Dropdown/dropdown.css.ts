import { theme } from '@ultraviolet/themes'
import { createVar, globalStyle, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

const DROPDOWN_MAX_HEIGHT = 256
const DROPDOWN_MIN_WIDTH = 320

export const dropdownWidth = createVar()

export const dropdown = style({
  backgroundColor: theme.colors.other.elevation.background.raised,
  color: theme.colors.neutral.text,
  boxShadow: `${theme.shadows.raised[0]}, ${theme.shadows.raised[1]}`,
  marginBottom: theme.space[10],
  minWidth: DROPDOWN_MIN_WIDTH,
  overflow: 'hidden',
  padding: theme.space[0],
  width: dropdownWidth,
})

export const dropdownContainer = style({
  maxHeight: DROPDOWN_MAX_HEIGHT,
  overflowY: 'auto',
  padding: theme.space[0],
})

export const dropdownGroup = style({
  display: 'flex',
  justifyContent: 'left',
  width: '100%',
  alignItems: 'center',
  border: 'none',
  background: theme.colors.neutral.backgroundWeak,
  position: 'sticky',
  top: 0,
  paddingInline: theme.space[2],
  height: theme.space[4],
  textAlign: 'left',
  marginBottom: theme.space['0.25'],
  selectors: {
    '&:focus': {
      background: theme.colors.neutral.backgroundWeak,
      outline: 'none',
    },
  },
})

export const dropdownGroupSelectable = recipe({
  base: {
    paddingLeft: `calc(${theme.space[2]} + ${theme.space[0.5]})`,
    border: '1px solid transparent',
    selectors: {
      '&:focus': {
        backgroundColor: theme.colors.neutral.backgroundHover,
      },
    },
  },
  variants: {
    size: {
      small: {
        paddingLeft: theme.space[1],
      },
      large: {},
      medium: {},
    },
  },
  defaultVariants: {
    size: 'large',
  },
})

export const dropdownSection = style({
  paddingBlock: theme.space[0.5],
  selectors: {
    ['&:not(:first-child)']: {
      borderTop: `1px solid ${theme.colors.neutral.borderWeak}`,
    },
    [`&:has(${dropdownGroup})`]: {
      paddingTop: 0,
    },
  },
})

export const dropdownGroupWrapper = style({
  position: 'sticky',
  top: 0,
})

export const emptyStateGroupStyle = style({
  textAlign: 'left',
  paddingBlock: theme.space['1.5'],
  paddingInline: theme.space[2],
  marginInline: theme.space['0.5'],
  borderRadius: theme.radii.default,
  border: '1px solid transparent',
})

export const dropdownItemBase = style([
  emptyStateGroupStyle,
  {
    backgroundColor: theme.colors.other.elevation.background.raised,
    display: 'grid',
  },
])

export const dropdownItem = recipe({
  base: [
    dropdownItemBase,
    {
      selectors: {
        '&:hover, &:focus': {
          backgroundColor: theme.colors.primary.background,
          color: theme.colors.primary.text,
          cursor: 'pointer',
        },
      },
    },
  ],
  defaultVariants: {
    disabled: false,
    selected: false,
    size: 'large',
  },
  variants: {
    selected: {
      true: {
        backgroundColor: theme.colors.primary.background,
      },
    },
    size: {
      large: {},
      medium: {},
      small: {
        padding: theme.space[1],
      },
    },
    disabled: {
      true: {
        backgroundColor: theme.colors.neutral.backgroundDisabled,
        color: theme.colors.neutral.textDisabled,
        selectors: {
          '&:hover, &:focus': {
            backgroundColor: theme.colors.neutral.backgroundStrongDisabled,
            color: theme.colors.neutral.textStrongDisabled,
            cursor: 'not-allowed',
            outline: 'none',
          },
        },
      },
    },
  },
})

export const footer = style({
  width: '100%',
  paddingBlock: theme.space['1.5'],
  paddingInline: theme.space[2],
  boxShadow: theme.shadows.dropdown,
})

const dropdownCheckboxBase = style({
  width: '100%',
  position: 'static',
  textAlign: 'left',
  pointerEvents: 'none',
})
export const dropdownCheckbox = style([dropdownCheckboxBase, { alignItems: 'flex-start' }])

export const dropdownCheckboxGroup = style([dropdownCheckboxBase, { alignItems: 'center' }])
export const dropdownEmptyState = style({ padding: theme.space[2] })

export const dropdownLoadMore = style({ padding: theme.space['0.5'] })

export const dropdownInfo = style({
  alignContent: 'center',
})

export const dropdownInfoTextItem = style({
  overflow: 'auto',
  textOverflow: 'ellipsis',
  flexShrink: 0,
  flexWrap: 'wrap',
  maxWidth: '100%',
})

export const dropdownInfoContainer = style({ overflow: 'hidden' })

export const searchBar = style({
  paddingBlock: theme.space['1.5'],
  paddingInline: theme.space[2],
})

export const comboboxCreate = style([
  dropdownItemBase,
  {
    marginBottom: theme.space[0.5],
    selectors: {
      '&:hover, &:focus': {
        backgroundColor: theme.colors.neutral.backgroundHover,
        cursor: 'pointer',
      },
    },
  },
])

export const optionalInfoPadding = style({})

globalStyle(`${optionalInfoPadding} > :first-child`, {
  marginTop: theme.space['0.25'],
})
