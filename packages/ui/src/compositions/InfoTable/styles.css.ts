import { theme } from '@ultraviolet/themes'
import { createVar, globalStyle, style, styleVariants } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { cardStyle } from '../../components/styles'

export const rowWidth = createVar()

const dl = style({
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  fontSize: theme.typography.body.fontSize,
  lineHeight: theme.typography.body.lineHeight,
  margin: 0,
  width: '100%',
})

const row = recipe({
  base: {
    borderBottom: `1px ${theme.colors.neutral.border} solid`,
    selectors: {
      '&:first-of-type': {
        paddingTop: 0,
      },
      '&:last-of-type': {
        borderBottomColor: 'transparent',
        paddingBottom: 0,
      },
    },
    width: rowWidth,
  },
  variants: {
    size: {
      small: { paddingBlock: theme.space[1] },
      large: { paddingBlock: theme.space[2] },
    },
  },
  defaultVariants: { size: 'large' },
})

const term = style({
  alignItems: 'center',
  minWidth: 0,
  display: 'inline-flex',
  gap: theme.space[1],
})

const desc = style({
  color: theme.colors.neutral.text,
  margin: 0,
  minWidth: 0,
  width: '100%',
  maxWidth: '100%',
})

const descFlex = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.space[0.25],
})

const cellWithCopyButton = style({
  maxWidth: '100%',
  width: '100%',
  minWidth: 0,
})

globalStyle(`${desc} > *`, {
  marginRight: theme.space[1],
  minWidth: 0,
  maxWidth: '100%',
  width: 'fit-content',
  alignItems: 'center',
})

const card = styleVariants({
  small: {},
  large: {},
})

// Global style to avoid importing infoTableStyle in packages/ui/src/components/Card/styles.css.ts
// which could cause build issues (css order)
globalStyle(`${card.small} > ${cardStyle.borderedBox}`, {
  padding: theme.space[2],
})

export const infoTableStyle = {
  dl,
  row,
  term,
  desc,
  descFlex,
  cellWithCopyButton,
  card,
}
