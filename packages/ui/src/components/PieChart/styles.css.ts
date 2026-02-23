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

const container = style({
  alignItems: 'center',
  display: 'flex',
  height: heightContainerPie,
})

const emptyLegend = style({
  alignItems: 'center',
  display: 'flex',
  marginLeft: theme.space[5],
})

const content = style({
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

const list = style({
  display: 'flex',
  flex: '1',
  flexDirection: 'column',
  fontSize: theme.typography.bodySmall.fontSize,
  listStyleType: 'none',
  maxHeight: '100%',
  overflowY: 'auto',
})

const listItem = recipe({
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

const bullet = recipe({
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

const label = style({
  alignItems: 'baseline',
  display: 'flex',
  flex: '1',
})

const value = styleVariants({
  default: {
    fontWeight: 400,
    marginLeft: theme.space[1],
  },
  isFocused: {
    fontWeight: 500,
    marginLeft: theme.space[1],
  },
})

const text = recipe({
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

const toggleBox = style({
  height: 21,
  position: 'absolute',
  width: 250,
})

const line = style({
  borderBottom: `1px solid ${theme.colors.neutral.border}`,
  position: 'relative',
  width: '100%',
})

const progressiveLine = recipe({
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

const listTooltip = style({
  margin: 0,
  padding: `0 ${theme.space[1]} ${theme.space[1]} ${theme.space[1]}`,
  width: '100%',
})

const itemTooltip = style({
  display: 'flex',
  gap: theme.space[1],
  justifyContent: 'space-between',
  marginTop: 6,
  textAlign: 'left',
  width: '100%',
})

export const pieChartStyle = {
  container,
  emptyLegend,
  content,
  listItem,
  list,
  bullet,
  label,
  value,
  text,
  toggleBox,
  line,
  progressiveLine,
  listTooltip,
  itemTooltip,
}
