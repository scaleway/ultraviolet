import { theme } from '@ultraviolet/themes'
import {
  globalStyle,
  keyframes,
  style,
  styleVariants,
} from '@vanilla-extract/css'

export const SIZES = {
  large: 75.5,
  medium: 49,
  small: 22.25,
} as const

export const DURATION = {
  large: 0.3,
  medium: 0.25,
  small: 0.15,
} as const

const slideIn = () =>
  keyframes({
    '0%': {
      transform: 'translateX(90%)',
    },
    '100%': {
      transform: 'translateX(0)',
    },
  })

export type SizeProp = keyof typeof SIZES

function makeStyleSize(size: SizeProp) {
  return {
    height: '100%',
    transform: 'translateX(0)',
    animation: `${slideIn()} linear ${DURATION[size]}s`,
  }
}
const drawer = styleVariants({
  large: makeStyleSize('large'),
  medium: makeStyleSize('medium'),
  small: makeStyleSize('small'),
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
})

const header = style({
  paddingInline: theme.space[2],
  paddingTop: theme.space[4],
})

const footer = style({
  padding: theme.space[2],
  paddingTop: 0,
})

const base = style({})

const push = style({})

const contentToPushStyle = style({})

globalStyle(`${contentToPushStyle}[data-drawer="small"]`, {
  paddingRight: `${SIZES.small}rem`,
  transition: `padding-right ${DURATION.small}s !important`,
})

globalStyle(`${contentToPushStyle}[data-drawer="medium"]`, {
  transition: `padding-right ${DURATION.small}s !important`,
  paddingRight: `${SIZES.medium}rem`,
})

globalStyle(`${contentToPushStyle}[data-drawer="large"]`, {
  paddingRight: `${SIZES.large}rem`,
  transition: `padding-right ${DURATION.large}s !important`,
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
