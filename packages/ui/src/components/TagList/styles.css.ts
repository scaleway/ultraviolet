import { theme } from '@ultraviolet/themes'
import { createVar, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { TAGS_GAP } from './constant'

export const popoverTriggerWidthVar = createVar()

export const tagListContainer = style({ display: 'flex' })

export const tagContainer = recipe({
  base: {
    alignItems: 'center',
    color: theme.colors.neutral.text,
    display: 'flex',
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
      maxWidth: 'fit-content',
      width: `calc(100% - ${popoverTriggerWidthVar})`,
    },
  },
})

export const ellipsisChild = style({
  selectors: {
    [`${ellipsisContainer} &`]: {
      maxWidth: 'fit-content',
      width: '100%',
    },
  },
})

export const tagsWrapper = style({
  alignSelf: 'center',
  backgroundColor: 'transparent',
  border: 'none',
  color: theme.colors.primary.text,
  cursor: 'pointer',
  fontSize: theme.typography.bodySmall.fontSize,
  maxWidth: '21.875rem',
  overflow: 'hidden',
  paddingLeft: theme.space[1],
  paddingRight: theme.space[1],
  textOverflow: 'ellipsis',
  whiteSpace: 'pre',
})
