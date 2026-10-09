import { theme } from '@ultraviolet/themes'
import { style, styleVariants } from '@vanilla-extract/css'
import { fadeIn, fadeOut } from '../../../../utils'

export const ANIMATION_DURATION = 200

const panel = style({
  backgroundColor: theme.colors.other.elevation.background.raised,
  borderRadius: theme.radii.default,
  boxShadow: `${theme.shadows.raised[0]}, ${theme.shadows.raised[1]}`,
  color: theme.colors.neutral.text,
  position: 'relative',
  zIndex: 1,
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
  open: { animation: `${ANIMATION_DURATION}ms ${fadeIn} forwards` },
  close: { animation: `${ANIMATION_DURATION / 2}ms ${fadeOut} forwards` },
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
