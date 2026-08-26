import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'

const title = style({
  marginBottom: theme.space[1],
  marginTop: theme.space[2],
})

const xsmall = style({})

export const dialogStyle = { title, xsmall }
