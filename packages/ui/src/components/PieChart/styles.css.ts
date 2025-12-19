import { theme } from '@ultraviolet/themes'
import {
  createVar,
  keyframes,
  style,
  styleVariants,
} from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const heightContainerPie = createVar()
export const colorBullet = createVar()

const bulletFlashAnimation = keyframes({
  '0%': {
    opacity: 1,
  },
  '50%': {
    opacity: 0.1,
  },
  '100%': {
    opacity: 1,
  },
})

export const containerPie = style({
  display: 'flex',
  alignItems: 'center',
  height: heightContainerPie,
})

export const emptyLegendPie = style({
  display: 'flex',
  alignItems: 'center',
  marginLeft: theme.space[5],
})

export const contentPie = style({
  display: 'inline-block',
  position: 'absolute',
  inset: 0,
  fontSize: theme.typography.headingStrong.fontSize,
  lineHeight: '100px',
  height: 100,
  width: 100,
  margin: 'auto',
  textAlign: 'center',
  verticalAlign: 'middle',
})

export const listPie = style({
  fontSize: theme.typography.bodySmall.fontSize,
  listStyleType: 'none',
  display: 'flex',
  flex: '1',
  flexDirection: 'column',
  maxHeight: '100%',
  overflowY: 'auto',
})

export const listItemPie = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.space[1],
    width: '100%',
  },
  variants: {
    isFocused: {
      true: {
        color: theme.colors.primary.text,
      },
      false: {
        color: theme.colors.neutral.text,
      },
    },
  },
})

export const bulletPie = recipe({
  base: {
    display: 'inline-block',
    borderRadius: theme.radii.circle,
    width: 10,
    height: 10,
    margin: `0 ${theme.space[1]}`,
    background: colorBullet,
  },
  variants: {
    isFocused: {
      true: {
        animation: `${bulletFlashAnimation} linear 1500ms infinite`,
      },
    },
  },
})

export const labelPie = style({
  display: 'flex',
  flex: '1',
  alignItems: 'baseline',
})

export const valuePie = styleVariants({
  default: {
    marginLeft: theme.space[1],
    fontWeight: 400,
  },
  isFocused: {
    marginLeft: theme.space[1],
    fontWeight: 500,
  },
})

export const textPie = recipe({
  base: {
    flex: 'none',
    marginRight: theme.space[1],
    maxWidth: '100%',
  },
  variants: {
    isFocused: {
      true: {
        fontWeight: 500,
      },
      false: {
        fontWeight: 400,
      },
    },
  },
})

export const toggleBoxPie = style({
  width: 250,
  height: 21,
  position: 'absolute',
})

export const linePie = style({
  borderBottom: `1px solid ${theme.colors.neutral.border}`,
  position: 'relative',
  width: '100%',
})

export const progressiveLinePie = recipe({
  base: {
    borderBottom: `1px solid ${theme.colors.primary.border}`,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: -1,
    transition: 'width 500ms ease',
  },
  variants: {
    isFocused: {
      true: {
        width: '100%',
      },
      false: {
        width: '0%',
      },
    },
  },
})

export const listTooltipPie = style({
  padding: `0 ${theme.space[1]} ${theme.space[1]} ${theme.space[1]}`,
  margin: 0,
  width: '100%',
})

export const itemTooltipPie = style({
  display: 'flex',
  marginTop: 6,
  width: '100%',
  justifyContent: 'space-between',
  textAlign: 'left',
  gap: theme.space[1],
})
