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
export const drawer = styleVariants({
  large: makeStyleSize('large'),
  medium: makeStyleSize('medium'),
  small: makeStyleSize('small'),
})

export const drawerContentWrapper = style({
  height: '100%',
  position: 'relative',
})

export const drawerChildrenWrapper = style({
  height: '100%',
  overflowY: 'auto',
})

export const drawerContent = style({
  paddingInline: theme.space[2],
})

export const drawerHeader = style({
  paddingInline: theme.space[2],
  paddingTop: theme.space[4],
})

export const drawerFooter = style({
  padding: theme.space[2],
  paddingTop: 0,
})

export const drawerBase = style({})

export const drawerPush = style({})

export const contentToPushStyle = style({})

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
