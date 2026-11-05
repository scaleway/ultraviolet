import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'

const SEARCH_INPUT_PANEL_MAX_HEIGHT = '25.625rem' // 410px
const SEARCH_INPUT_PANEL_MIN_WIDTH = '38.125rem' // 610px

const popup = style({
  padding: `${theme.space['2']} ${theme.space['1']}`,
  minWidth: SEARCH_INPUT_PANEL_MIN_WIDTH,
  maxHeight: SEARCH_INPUT_PANEL_MAX_HEIGHT,
  overflow: 'auto',
  textAlign: 'initial',
})

const searchInput = style({})

const triggerContainer = style({
  width: '100%',
})

const clickableStack = style({ cursor: 'text' })

export const searchInputStyle = {
  popup,
  searchInput,
  clickableStack,
  triggerContainer,
}
