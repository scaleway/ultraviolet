import { theme } from '@ultraviolet/themes'
import { globalStyle, style } from '@vanilla-extract/css'
import { APP_MAX_WIDTH } from '../../constants'

export const title = style({ alignSelf: 'center' })

export const group = style({
  fill: theme.colors.danger.backgroundStrong,
})

globalStyle(`${group} svg`, { width: '100%' })

export const communityContainer = style({
  padding: theme.space[3],
  backgroundColor: theme.colors.primary.background,
  borderRadius: theme.radii.default,
  '@media': {
    '(max-width: 1280px)': { flexDirection: 'column', justifyContent: 'start' },
  },
})

export const homeContainer = style({
  maxWidth: `${APP_MAX_WIDTH}px`,
  '@media': {
    '(max-width: 1280px)': { padding: `0 ${theme.space[2]}`, width: '100%' },
  },
})

export const headingContainer = style({
  '@media': {
    '(max-width: 1280px)': { flexDirection: 'column' },
  },
})

export const openSourceDescription = style({ marginBottom: 12 })

export const openSourceTitle = style({ alignSelf: 'center' })

export const openSourceCard = style({ flex: 1 })

export const openSourceStack = style({
  '@media': {
    '(max-width: 1280px)': { flexDirection: 'column' },
  },
})
