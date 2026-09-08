import { theme } from '@ultraviolet/themes'
import { createVar, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { MIN_TAG_WIDTH_PX, TAGS_GAP_PX } from './constant'

export const popoverTriggerWidthVar = createVar()

const container = style({
  display: 'flex',
  width: '100% !important', // It should always have a width of 100% for overflow computation
  position: 'relative',
})

const measurementContainer = style({
  position: 'absolute',
  visibility: 'hidden',
  whiteSpace: 'nowrap',
  pointerEvents: 'none',
  display: 'flex',
})

const tagContainer = recipe({
  base: {
    alignItems: 'center',
    color: theme.colors.neutral.text,
    display: 'flex',
    gap: `${TAGS_GAP_PX}px`,
    maxWidth: '100%',
    overflow: 'hidden',
  },
  variants: {
    multiline: {
      true: {
        flexWrap: 'wrap',
      },
    },
  },
})

const list = style({
  padding: 0,
  margin: 0,
  listStyle: 'none',
  overflow: 'hidden',
  selectors: {
    [`${tagContainer()} > &`]: {
      display: 'contents',
    },
  },
})

const listItem = style({
  selectors: {
    '&:only-child': {
      overflow: 'hidden',
    },
  },
})

const tag = style({
  maxWidth: 'fit-content',
  minWidth: MIN_TAG_WIDTH_PX,
  width: '100%',
})

const counter = style({
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

export const tagListStyle = {
  container,
  tagContainer,
  tag,
  counter,
  measurementContainer,
  list,
  listItem,
}
