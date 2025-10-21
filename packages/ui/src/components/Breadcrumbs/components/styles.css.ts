import { theme } from '@ultraviolet/themes'
import { createVar, globalStyle, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const maxWidthVar = createVar({
  syntax: '*',
  inherits: false,
  initialValue: 'fit-content',
})
export const minWidthVar = createVar({
  syntax: '*',
  inherits: false,
  initialValue: 'auto',
})

export const linkBreadcrumbs = style({
  paddingRight: theme.space[1],
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})

export const contentBreadcrumbs = style({
  minWidth: minWidthVar,
  maxWidth: maxWidthVar,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  display: 'block',
  textOverflow: 'ellipsis',
})

export const itemContainerBreadcrumbs = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    flex: '1',
    minWidth: minWidthVar,
    maxWidth: maxWidthVar,
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
export const breadcrumbsItem = style({})

globalStyle(
  `${breadcrumbsItem}:not(:first-child) ${linkBreadcrumbs}, ${breadcrumbsItem}:not(:first-child) ${contentBreadcrumbsText}`,
  {
    padding: `0 ${theme.space[1]}`,
  },
)

globalStyle(`${breadcrumbsItem}:last-child ${linkBreadcrumbs}`, {
  pointerEvents: 'none',
})

globalStyle(`${breadcrumbsItem}:last-child ${contentBreadcrumbs}`, {
  pointerEvents: 'none',
  cursor: 'default',
})
