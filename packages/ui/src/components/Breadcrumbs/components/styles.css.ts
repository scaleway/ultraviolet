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

export const linkBreadcrumbs = style({
  overflow: 'hidden',
  paddingRight: theme.space[1],
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

export const contentBreadcrumbs = style({
  display: 'block',
  maxWidth: maxWidthVar,
  minWidth: minWidthVar,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

export const itemContainerBreadcrumbs = recipe({
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
  cursor: 'default',
  pointerEvents: 'none',
})
