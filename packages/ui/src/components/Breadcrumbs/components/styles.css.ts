import { theme } from '@ultraviolet/themes'
import { createVar, globalStyle, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const maxWidthVar = createVar({
  inherits: false,
  initialValue: 'fit-content',
  syntax: '*',
})
export const minWidthVar = createVar({
  inherits: false,
  initialValue: 'auto',
  syntax: '*',
})

export const link = style({
  overflow: 'hidden',
  paddingRight: theme.space[1],
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

export const content = style({
  display: 'block',
  maxWidth: maxWidthVar,
  minWidth: minWidthVar,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

export const itemContainer = recipe({
  base: {
    alignItems: 'center',
    display: 'flex',
    flex: '1',
    maxWidth: maxWidthVar,
    minWidth: minWidthVar,
  },
  variants: {
    clickable: {
      true: {
        cursor: 'pointer',
      },
    },
  },
})

export const contentBreadcrumbsText = style({})
export const item = style({})

globalStyle(
  `${item}:not(:first-child) ${link}, ${item}:not(:first-child) ${contentBreadcrumbsText}`,
  {
    padding: `0 ${theme.space[1]}`,
  },
)

globalStyle(`${item}:last-child ${link}`, {
  pointerEvents: 'none',
})

globalStyle(`${item}:last-child ${content}`, {
  cursor: 'default',
  pointerEvents: 'none',
})
