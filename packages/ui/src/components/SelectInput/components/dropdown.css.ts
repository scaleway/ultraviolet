import { theme } from '@ultraviolet/themes'
import { createVar, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

const DROPDOWN_MAX_HEIGHT = 256
export const dropdownWidth = createVar()

export const dropdown = style({
  backgroundColor: theme.colors.other.elevation.background.raised,
  color: theme.colors.neutral.text,
  boxShadow: `${theme.shadows.raised[0]}, ${theme.shadows.raised[1]}`,
  marginBottom: theme.space[10],
  minWidth: 320,
  overflow: 'hidden',
  padding: theme.space[0],
  width: dropdownWidth,
})

export const dropdownContainer = style({
  maxHeight: `${DROPDOWN_MAX_HEIGHT}px`,
  overflowY: 'auto',
  padding: theme.space[0],
  paddingBottom: theme.space['0.5'],
})

export const dropdownContainerUnGrouped = style({
  paddingTop: theme.space['0.5'],
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
    paddingLeft: theme.space[2],
    borderLeft: `${theme.space['0.5']} solid ${theme.colors.neutral.backgroundWeak}`,
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
      default: {},
    },
  },
  defaultVariants: {
    size: 'default',
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
    size: 'default',
  },
  variants: {
    selected: {
      true: {
        backgroundColor: theme.colors.primary.background,
      },
    },
    size: {
      default: {},
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

export const dropdownCheckbox = style({
  width: '100%',
  position: 'static',
  textAlign: 'left',
  alignItems: 'center',
  pointerEvents: 'none',
})

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
