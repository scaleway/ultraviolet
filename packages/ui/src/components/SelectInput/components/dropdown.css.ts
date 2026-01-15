import { theme } from '@ultraviolet/themes'
import { createVar, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

const DROPDOWN_MAX_HEIGHT = 256
export const dropdownWidth = createVar()

export const dropdown = style({
  backgroundColor: theme.colors.other.elevation.background.raised,
  boxShadow: `${theme.shadows.raised[0]}, ${theme.shadows.raised[1]}`,
  color: theme.colors.neutral.text,
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
  alignItems: 'center',
  background: theme.colors.neutral.backgroundWeak,
  border: 'none',
  display: 'flex',
  height: theme.space[4],
  justifyContent: 'left',
  marginBottom: theme.space['0.25'],
  paddingInline: theme.space[2],
  position: 'sticky',
  selectors: {
    '&:focus': {
      background: theme.colors.neutral.backgroundWeak,
      outline: 'none',
    },
  },
  textAlign: 'left',
  top: 0,
  width: '100%',
})

export const dropdownGroupSelectable = style({
  borderLeft: `${theme.space['0.5']} solid ${theme.colors.neutral.backgroundWeak}`,
  paddingLeft: theme.space[2],
  selectors: {
    '&:focus': {
      backgroundColor: theme.colors.neutral.backgroundHover,
    },
  },
})

export const dropdownGroupWrapper = style({
  position: 'sticky',
  top: 0,
})

export const dropdownItemBase = style({
  backgroundColor: theme.colors.other.elevation.background.raised,
  border: '1px solid transparent',
  borderRadius: theme.radii.default,
  color: theme.colors.neutral.text,
  marginInline: theme.space['0.5'],
  paddingBlock: theme.space['1.5'],
  paddingInline: theme.space[2],
  selectors: {
    '&:hover, &:focus': {
      backgroundColor: theme.colors.primary.background,
      color: theme.colors.primary.text,
      cursor: 'pointer',
    },
  },
  textAlign: 'left',
})

export const dropdownItem = recipe({
  base: [dropdownItemBase],
  defaultVariants: {
    disabled: false,
    selected: false,
  },
  variants: {
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
    selected: {
      true: {
        backgroundColor: theme.colors.primary.background,
      },
    },
  },
})

export const footer = style({
  boxShadow: theme.shadows.dropdown,
  paddingBlock: theme.space['1.5'],
  paddingInline: theme.space[2],
  width: '100%',
})

export const dropdownCheckbox = style({
  alignItems: 'center',
  pointerEvents: 'none',
  position: 'static',
  textAlign: 'left',
  width: '100%',
})

export const dropdownEmptyState = style({ padding: theme.space[2] })

export const dropdownLoadMore = style({ padding: theme.space['0.5'] })

export const dropdownInfo = style({
  alignContent: 'center',
})

export const dropdownInfoTextItem = style({
  flexShrink: 0,
  flexWrap: 'wrap',
  maxWidth: '100%',
  overflow: 'auto',
  textOverflow: 'ellipsis',
})

export const dropdownInfoContainer = style({ overflow: 'hidden' })

export const searchBar = style({
  paddingBlock: theme.space['1.5'],
  paddingInline: theme.space[2],
})
