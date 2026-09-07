import { theme } from '@ultraviolet/themes'
import { globalStyle, style, styleVariants } from '@vanilla-extract/css'

export const SIZES = {
  large: 75.5,
  medium: 49,
  small: 22.25,
} as const

export type SizeProp = keyof typeof SIZES

const drawer = styleVariants({
  large: {},
  medium: {},
  small: {},
})

const contentWrapper = style({
  height: '100%',
  position: 'relative',
})

const childrenWrapper = style({
  height: '100%',
  overflowY: 'auto',
})

const content = style({
  paddingInline: theme.space[2],
  height: '100%',
})

const header = style({
  paddingInline: theme.space[2],
  paddingTop: theme.space[4],
})

const footer = style({
  padding: theme.space[2],
  paddingTop: 0,
})

const base = style({
  height: '100%',
})

const push = style({})

const contentToPushStyle = style({})

globalStyle(`${contentToPushStyle}[data-drawer="small"]`, {
  paddingRight: `${SIZES.small}rem`,
})

globalStyle(`${contentToPushStyle}[data-drawer="medium"]`, {
  paddingRight: `${SIZES.medium}rem`,
})

globalStyle(`${contentToPushStyle}[data-drawer="large"]`, {
  paddingRight: `${SIZES.large}rem`,
})
export const drawerStyle = {
  drawer,
  contentWrapper,
  childrenWrapper,
  content,
  header,
  footer,
  base,
  push,
  contentToPushStyle,
}
