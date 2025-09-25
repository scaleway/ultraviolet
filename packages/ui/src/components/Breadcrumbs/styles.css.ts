import { theme } from '@ultraviolet/themes'
import { globalStyle, style } from '@vanilla-extract/css'
import { HEIGHT } from './constants'

export const breadcrumbs = style({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  minHeight: HEIGHT,
})

globalStyle(`${breadcrumbs} > *:not(:last-child)`, {
  display: 'flex',
  alignItems: 'center',
})

globalStyle(`${breadcrumbs} > *:not(:last-child)::after`, {
  content: '/',
  padding: `0 ${theme.space['0.5']}`,
  fontSize: theme.typography.bodySmallStrong.fontSize,
  fontWeight: theme.typography.bodySmallStrong.weight,
})
