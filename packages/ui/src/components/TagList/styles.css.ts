import { theme } from '@ultraviolet/themes'
import { createVar, globalStyle, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { TAGS_GAP } from './constant'

export const popoverTriggerWidthVar = createVar()

export const tagListContainer = style({ display: 'flex' })

export const tagContainer = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    color: theme.colors.neutral.text,
    gap: TAGS_GAP,
  },
  variants: {
    multiline: {
      true: {
        flexWrap: 'wrap',
      },
    },
  },
})

export const ellipsisContainer = style({
  selectors: {
    '&:has(.ellipsed)': {
      width: `calc(100% - ${popoverTriggerWidthVar})`,
      maxWidth: 'fit-content',
    },
  },
})

globalStyle(`${ellipsisContainer} span, ${ellipsisContainer} div`, {
  width: '100%',
  maxWidth: 'fit-content',
})

export const tagsWrapper = style({
  cursor: 'pointer',
  color: theme.colors.primary.text,
  border: 'none',
  fontSize: theme.typography.bodySmall.fontSize,
  alignSelf: 'center',
  maxWidth: '21.875rem',
  overflow: 'hidden',
  whiteSpace: 'pre',
  textOverflow: 'ellipsis',
  backgroundColor: 'transparent',
  paddingLeft: theme.space[1],
  paddingRight: theme.space[1],
})
