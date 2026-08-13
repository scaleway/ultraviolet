import { theme } from '@ultraviolet/themes'
import { style, styleVariants } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { fadeIn, fadeOut } from '../../utils'

export const ARROW_SIZE = 8
const ARROW_RADIUS = 2
export const ANIMATION_DURATION = 200

const tooltip = style({
  backgroundColor: theme.colors.neutral.backgroundStronger,
  borderRadius: theme.radii.default,
  color: theme.colors.neutral.textStronger,
  fontSize: theme.typography.caption.fontSize,
  lineHeight: theme.typography.caption.lineHeight,
  overflowWrap: 'break-word',
  padding: `${theme.space['0.5']} ${theme.space[1]}`,
  textAlign: 'center',
  zIndex: 1,
})

const arrow = style({
  backgroundColor: theme.colors.neutral.backgroundStronger,
  height: ARROW_SIZE,
  width: ARROW_SIZE,
  position: 'absolute',
  transform: 'rotate(45deg)',
  selectors: {
    [`${tooltip}[data-placement=top] &`]: {
      bottom: `-${ARROW_SIZE / 2}px`,
      borderBottomRightRadius: ARROW_RADIUS,
    },
    [`${tooltip}[data-placement=right] &`]: {
      left: `-${ARROW_SIZE / 2}px`,
      borderBottomLeftRadius: ARROW_RADIUS,
    },
    [`${tooltip}[data-placement=bottom] &`]: {
      top: `-${ARROW_SIZE / 2}px`,
      borderTopLeftRadius: ARROW_RADIUS,
    },
    [`${tooltip}[data-placement=left] &`]: {
      right: `-${ARROW_SIZE / 2}px`,
      borderTopRightRadius: ARROW_RADIUS,
    },
  },
})

const content = style({
  maxHeight: '100%',
  overflow: 'auto',
  position: 'relative',
})

const animation = styleVariants({
  open: { animation: `${ANIMATION_DURATION}ms ${fadeIn} forwards` },
  close: { animation: `${ANIMATION_DURATION / 2}ms ${fadeOut} forwards` },
})

const childrenContainer = recipe({
  base: {
    display: 'inherit',
    maxWidth: '100%',
  },
  variants: {
    fullHeight: {
      true: {
        height: '100%',
      },
    },
    fullWidth: {
      true: {
        width: '100%',
      },
    },
  },
})

export const tooltipStyle = {
  animation,
  arrow,
  childrenContainer,
  content,
  tooltip,
}
