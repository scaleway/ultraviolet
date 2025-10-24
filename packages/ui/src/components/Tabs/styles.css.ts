import { theme } from '@ultraviolet/themes'
import { globalStyle, style, styleVariants } from '@vanilla-extract/css'

export const tabsMenuContainer = style({
  display: 'flex',
  flexDirection: 'column',
})

export const tabsMenu = style({
  position: 'sticky',
  right: 0,
  top: 0,
  bottom: 0,
  background: `${theme.colors.neutral.background} !important`,
  boxShadow: theme.shadows.menu,
})

export const tabsContainer = style({
  display: 'flex',
  flexWrap: 'nowrap',
  overflowX: 'scroll',
  position: 'relative',
  zIndex: 0,
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  selectors: {
    '&::after': {
      zIndex: -1,
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 2,
      background: theme.colors.neutral.border,
    },
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
})

export const tabsBadge = style({
  padding: `0 ${theme.space[1]}`,
  marginLeft: theme.space[1],
})

export const tabsTextSelected = styleVariants({
  selected: {
    color: theme.colors.primary.text,
  },
  default: {},
})

export const tabsBadgeContainer = style({
  marginLeft: theme.space[1],
  display: 'flex',
})

export const tabsButton = style({
  display: 'flex',
  flexDirection: 'row',
  padding: `${theme.space[1]} ${theme.space[2]}`,
  cursor: 'pointer',
  justifyContent: 'center',
  alignItems: 'baseline',
  whiteSpace: 'nowrap',
  color: theme.colors.neutral.text,
  textDecoration: 'none',
  userSelect: 'none',
  touchAction: 'manipulation',
  transition: 'color 0.2s',
  border: 'none',
  background: 'none',
  borderBottom: `2px solid ${theme.colors.neutral.border}`,
  outline: 'none',
  fontSize: theme.typography.bodyStrong.fontSize,
  fontFamily: theme.typography.bodyStrong.fontFamily,
  fontWeight: theme.typography.bodyStrong.weight,
  letterSpacing: theme.typography.bodyStrong.letterSpacing,
  lineHeight: theme.typography.bodyStrong.lineHeight,
  selectors: {
    '&:hover, &:active, &:focus': {
      textDecoration: 'none',
      outline: 'none',
    },
    '&:focus-visible': {
      outline: 'auto',
    },
    '&[aria-selected="true"]': {
      color: theme.colors.primary.text,
      borderBottomColor: theme.colors.primary.border,
    },
    '&[aria-disabled="false"]:not(:disabled):focus, &[aria-disabled="false"]:not(:disabled):hover, &[aria-disabled="false"]:not(:disabled):active':
      {
        outline: 'none',
        color: theme.colors.primary.text,
        borderBottomColor: theme.colors.primary.border,
      },
    '&[aria-disabled="true"], &:disabled': {
      cursor: 'not-allowed',
      filter: 'grayscale(1) opacity(50%)',
    },
    [`${tabsMenuContainer} &`]: {
      fontSize: theme.typography.bodySmall.fontSize,
      lineHeight: theme.typography.bodySmall.lineHeight,
      fontWeight: 'inherit',
      borderBottomWidth: 1.5,
      width: '100%',
      cursor: 'pointer',
      minWidth: '6.875rem',
      backgroundColor: 'transparent',
    },
    [`${tabsMenuContainer} &[aria-disabled='true']`]: {
      cursor: 'not-allowed',
      filter: 'grayscale(1) opacity(50%)',
    },
    [`${tabsMenuContainer} &:disabled`]: {
      cursor: 'not-allowed',
      filter: 'grayscale(1) opacity(50%)',
    },
  },
})

globalStyle(
  `${tabsButton}[aria-selected="false"]:hover ${tabsBadge}, ${tabsButton}[aria-selected="false"]:active ${tabsBadge}`,
  {
    backgroundColor: theme.colors.primary.background,
    borderColor: theme.colors.primary.background,
    color: theme.colors.primary.text,
  },
)

globalStyle(
  `${tabsButton}:hover ${tabsTextSelected.default}, ${tabsButton}:focus ${tabsTextSelected.default}, ${tabsButton}:active ${tabsTextSelected.default}`,
  {
    color: theme.colors.primary.text,
  },
)

export const tabsArrowIcon = style({
  color: 'inherit',
  marginLeft: theme.space[1],
  transition: '300ms transform ease-out',
})

export const tabsMenuWrapper = style({
  display: 'flex',
  position: 'sticky',
  top: 0,
  bottom: 0,
  right: 0,
})

globalStyle(`${tabsButton}[aria-expanded="true"] ${tabsArrowIcon}`, {
  transform: 'rotate(-180deg)',
})
