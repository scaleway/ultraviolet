import { theme } from '@ultraviolet/themes'
import { createVar, keyframes, style, styleVariants } from '@vanilla-extract/css'

export const ANIMATION_DURATION = 200

// Distance the panel travels on open/close. Uses the `translate` property
// (independent from `transform`, which Floating UI uses to position the panel).
const OFFSET = 2

const offsetX = createVar()
const offsetY = createVar()

const slideIn = keyframes({
  from: { opacity: 0, translate: `${offsetX} ${offsetY}` },
  to: { opacity: 1, translate: '0 0' },
})

const slideOut = keyframes({
  from: { opacity: 1, translate: '0 0' },
  to: { opacity: 0, translate: `${offsetX} ${offsetY}` },
})

const panel = style({
  backgroundColor: theme.colors.other.elevation.background.raised,
  borderRadius: theme.radii.default,
  boxShadow: `${theme.shadows.raised[0]}, ${theme.shadows.raised[1]}`,
  color: theme.colors.neutral.text,
  position: 'relative',
  zIndex: 1,
  vars: { [offsetX]: '0px', [offsetY]: '0px' },
  selectors: {
    "&[data-placement^='top']": { vars: { [offsetY]: `${OFFSET}px` } },
    "&[data-placement^='bottom']": { vars: { [offsetY]: `-${OFFSET}px` } },
    "&[data-placement^='left']": { vars: { [offsetX]: `${OFFSET}px` } },
    "&[data-placement^='right']": { vars: { [offsetX]: `-${OFFSET}px` } },
  },
})

const content = style({
  maxHeight: '100%',
  overflow: 'auto',
  position: 'relative',
})

const arrow = style({
  fill: theme.colors.other.elevation.background.raised,
})

const animation = styleVariants({
  open: {
    animation: `${ANIMATION_DURATION}ms ${slideIn} forwards`,
    '@media': { '(prefers-reduced-motion: reduce)': { animation: 'none' } },
  },
  close: {
    animation: `${ANIMATION_DURATION / 2}ms ${slideOut} forwards`,
    '@media': { '(prefers-reduced-motion: reduce)': { animation: 'none' } },
  },
})

const trigger = style({
  display: 'contents',
})

export const popupV2Style = {
  animation,
  arrow,
  content,
  panel,
  trigger,
}
