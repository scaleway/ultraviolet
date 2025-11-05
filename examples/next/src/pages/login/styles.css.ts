import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'

export const switchButton = style({ margin: 'auto' })

export const page = style({ height: '100%', width: '100%' })

export const loginContainer = style({
  margin: '5vh 30vw',
  background: theme.colors.primary.background,
  padding: theme.space[4],
})

export const loginInput = style({
  padding: `${theme.space['1.5']} ${theme.space[5]}`,
  width: '100%',
})

export const signupContainer = style({
  margin: '5vh 25vw',
  background: theme.colors.secondary.background,
  padding: theme.space[4],
})

export const signupInput = style({
  padding: `${theme.space['1.5']} ${theme.space[0]}`,
  width: '100%',
})
