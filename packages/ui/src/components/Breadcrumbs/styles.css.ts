import { theme } from '@ultraviolet/themes'
import { globalStyle, style } from '@vanilla-extract/css'
import { HEIGHT } from './constants'

export const breadcrumbs = style({
  alignItems: 'center',
  display: 'flex',
  flexWrap: 'wrap',
  listStyle: 'none',
  margin: 0,
  minHeight: HEIGHT,
  padding: 0,
})

globalStyle(`${breadcrumbs} > *:not(:last-child)`, {
  alignItems: 'center',
  display: 'flex',
})

globalStyle(`${breadcrumbs} > *:not(:last-child)::after`, {
  content: '/',
  fontSize: theme.typography.bodySmallStrong.fontSize,
  fontWeight: theme.typography.bodySmallStrong.weight,
  padding: `0 ${theme.space['0.5']}`,
})
