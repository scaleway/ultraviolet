import { theme } from '@ultraviolet/themes'
import { style, styleVariants } from '@vanilla-extract/css'

const menuContainer = style({
  display: 'flex',
  flexDirection: 'column',
})

const menu = style({
  background: `${theme.colors.neutral.background} !important`,
  bottom: 0,
  boxShadow: theme.shadows.menu,
  position: 'sticky',
  right: 0,
  top: 0,
})

const container = style({
  display: 'flex',
  flexWrap: 'nowrap',
  msOverflowStyle: 'none',
  overflowX: 'scroll',
  position: 'relative',
  scrollbarWidth: 'none',
  selectors: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    '&::after': {
      background: theme.colors.neutral.border,
      bottom: 0,
      content: '""',
      height: 2,
      left: 0,
      position: 'absolute',
      right: 0,
      zIndex: -1,
    },
  },
  zIndex: 0,
})

const badgeContainer = style({
  display: 'flex',
  marginLeft: theme.space[1],
})

const button = style({
  alignItems: 'baseline',
  background: 'none',
  border: 'none',
  borderBottom: `2px solid ${theme.colors.neutral.border}`,
  color: theme.colors.neutral.text,
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'row',
  fontFamily: theme.typography.bodyStrong.fontFamily,
  fontSize: theme.typography.bodyStrong.fontSize,
  fontWeight: theme.typography.bodyStrong.weight,
  justifyContent: 'center',
  letterSpacing: theme.typography.bodyStrong.letterSpacing,
  lineHeight: theme.typography.bodyStrong.lineHeight,
  outline: 'none',
  padding: `${theme.space[1]} ${theme.space[2]}`,
  selectors: {
    '&:focus-visible': {
      outline: 'auto',
    },
    '&:hover, &:active, &:focus': {
      outline: 'none',
      textDecoration: 'none',
    },
    '&[aria-disabled="false"]:not(:disabled):focus, &[aria-disabled="false"]:not(:disabled):hover, &[aria-disabled="false"]:not(:disabled):active':
      {
        borderBottomColor: theme.colors.primary.border,
        color: theme.colors.primary.text,
        outline: 'none',
      },
    '&[aria-disabled="true"], &:disabled': {
      cursor: 'not-allowed',
      filter: 'grayscale(1) opacity(50%)',
    },
    '&[aria-selected="true"]': {
      borderBottomColor: theme.colors.primary.border,
      color: theme.colors.primary.text,
    },
    [`${menuContainer} &`]: {
      backgroundColor: 'transparent',
      borderBottomWidth: 1.5,
      cursor: 'pointer',
      fontSize: theme.typography.bodySmall.fontSize,
      fontWeight: 'inherit',
      lineHeight: theme.typography.bodySmall.lineHeight,
      minWidth: '6.875rem',
      width: '100%',
    },
    [`${menuContainer} &[aria-disabled='true']`]: {
      cursor: 'not-allowed',
      filter: 'grayscale(1) opacity(50%)',
    },
    [`${menuContainer} &:disabled`]: {
      cursor: 'not-allowed',
      filter: 'grayscale(1) opacity(50%)',
    },
  },
  textDecoration: 'none',
  touchAction: 'manipulation',
  transition: 'color 0.2s',
  userSelect: 'none',
  whiteSpace: 'nowrap',
})

const badge = style({
  marginLeft: theme.space[1],
  padding: `0 ${theme.space[1]}`,
  selectors: {
    [`${button}[aria-selected="false"]:hover &, ${button}[aria-selected="false"]:active &`]:
      {
        backgroundColor: theme.colors.primary.background,
        borderColor: theme.colors.primary.background,
        color: theme.colors.primary.text,
      },
  },
})

const textSelected = styleVariants({
  default: {
    selectors: {
      [`${button}:hover &, ${button}:focus &, ${button}:active &`]: {
        color: theme.colors.primary.text,
      },
    },
  },
  selected: {
    color: theme.colors.primary.text,
  },
})

const arrowIcon = style({
  color: 'inherit',
  marginLeft: theme.space[1],
  transition: '300ms transform ease-out',
  selectors: {
    [`${button}[aria-expanded="true"] &`]: {
      transform: 'rotate(-180deg)',
    },
  },
})

const menuWrapper = style({
  bottom: 0,
  display: 'flex',
  position: 'sticky',
  right: 0,
  top: 0,
})

export const tabsStyle = {
  menuContainer,
  menu,
  container,
  badgeContainer,
  button,
  badge,
  textSelected,
  arrowIcon,
  menuWrapper,
}
