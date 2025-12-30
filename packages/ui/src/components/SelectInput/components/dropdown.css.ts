import { theme } from '@ultraviolet/themes'
import { createVar, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

const DROPDOWN_MAX_HEIGHT = 256
export const dropdownWidth = createVar()

export const dropdown = style({
  width: dropdownWidth,
  minWidth: 320,
  backgroundColor: theme.colors.other.elevation.background.raised,
  color: theme.colors.neutral.text,
  boxShadow: `${theme.shadows.raised[0]}, ${theme.shadows.raised[1]}`,
  padding: theme.space[0],
  marginBottom: theme.space[10],
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
  width: '100%',
  justifyContent: 'left',
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

export const dropdownGroupSelectable = style({
  paddingLeft: theme.space[2],
  borderLeft: `${theme.space['0.5']} solid ${theme.colors.neutral.backgroundWeak}`,
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

export const dropdownItem = recipe({
  base: {
    textAlign: 'left',
    backgroundColor: theme.colors.other.elevation.background.raised,
    paddingBlock: theme.space['1.5'],
    paddingInline: theme.space[2],
    marginInline: theme.space['0.5'],
    color: theme.colors.neutral.text,
    borderRadius: theme.radii.default,
    border: '1px solid transparent',
    selectors: {
      '&:hover, &:focus': {
        backgroundColor: theme.colors.primary.background,
        color: theme.colors.primary.text,
        cursor: 'pointer',
      },
    },
  },
  variants: {
    selected: {
      true: {
        backgroundColor: theme.colors.primary.background,
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
  defaultVariants: {
    disabled: false,
    selected: false,
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
