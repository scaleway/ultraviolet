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
  alignItems: 'center',
  display: 'flex',
  height: heightContainerPie,
})

export const emptyLegendPie = style({
  alignItems: 'center',
  display: 'flex',
  marginLeft: theme.space[5],
})

export const contentPie = style({
  display: 'inline-block',
  fontSize: theme.typography.headingStrong.fontSize,
  height: 100,
  inset: 0,
  lineHeight: '100px',
  margin: 'auto',
  position: 'absolute',
  textAlign: 'center',
  verticalAlign: 'middle',
  width: 100,
})

export const listPie = style({
  display: 'flex',
  flex: '1',
  flexDirection: 'column',
  fontSize: theme.typography.bodySmall.fontSize,
  listStyleType: 'none',
  maxHeight: '100%',
  overflowY: 'auto',
})

export const listItemPie = recipe({
  base: {
    alignItems: 'center',
    display: 'flex',
    marginTop: theme.space[1],
    width: '100%',
  },
  variants: {
    isFocused: {
      false: {
        color: theme.colors.neutral.text,
      },
      true: {
        color: theme.colors.primary.text,
      },
    },
  },
})

export const bulletPie = recipe({
  base: {
    background: colorBullet,
    borderRadius: theme.radii.circle,
    display: 'inline-block',
    height: 10,
    margin: `0 ${theme.space[1]}`,
    width: 10,
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
  alignItems: 'baseline',
  display: 'flex',
  flex: '1',
})

export const valuePie = styleVariants({
  default: {
    fontWeight: 400,
    marginLeft: theme.space[1],
  },
  isFocused: {
    fontWeight: 500,
    marginLeft: theme.space[1],
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
      false: {
        fontWeight: 400,
      },
      true: {
        fontWeight: 500,
      },
    },
  },
})

export const toggleBoxPie = style({
  height: 21,
  position: 'absolute',
  width: 250,
})

export const linePie = style({
  borderBottom: `1px solid ${theme.colors.neutral.border}`,
  position: 'relative',
  width: '100%',
})

export const progressiveLinePie = recipe({
  base: {
    borderBottom: `1px solid ${theme.colors.primary.border}`,
    bottom: -1,
    left: 0,
    position: 'absolute',
    top: 0,
    transition: 'width 500ms ease',
  },
  variants: {
    isFocused: {
      false: {
        width: '0%',
      },
      true: {
        width: '100%',
      },
    },
  },
})

export const listTooltipPie = style({
  margin: 0,
  padding: `0 ${theme.space[1]} ${theme.space[1]} ${theme.space[1]}`,
  width: '100%',
})

export const itemTooltipPie = style({
  display: 'flex',
  gap: theme.space[1],
  justifyContent: 'space-between',
  marginTop: 6,
  textAlign: 'left',
  width: '100%',
})
