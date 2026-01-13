import { theme } from '@ultraviolet/themes'
import {
  globalStyle,
  keyframes,
  style,
  styleVariants,
} from '@vanilla-extract/css'
import { modalBackdropBase } from '../Modal/styles.css'

export const SIZES = {
  large: 75.5,
  medium: 49,
  small: 22.25,
}

const slideIn = (translation: number) =>
  keyframes({
    '0%': {
      transform: `translateX(${translation}rem)`,
    },
    '100%': {
      transform: 'translateX(0)',
    },
  })

export type SizeProp = keyof typeof SIZES

function makeStyleSize(size: SizeProp) {
  const translations = {
    large: 70,
    medium: 48,
    small: 21,
  } as const

  const animationDuration = {
    large: 300,
    medium: 250,
    small: 150,
  }

  return {
    animation: `${slideIn(translations[size])} linear ${animationDuration[size]}ms`,
    borderRadius: 0,
    height: '100%',
    marginRight: 0,
    padding: 0,
    width: `${SIZES[size]}rem`,
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

Object.keys(SIZES).map(size =>
  globalStyle(
    `${modalBackdropBase}:has(${drawer[size as keyof typeof drawer]})`,
    {
      padding: 0,
      transition: 'opacity 100ms ease-in-out',
    },
  ),
)
