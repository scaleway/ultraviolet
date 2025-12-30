import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'

export const snippetStory = style({
  padding: theme.space[2],
})

export const stackStory = style({
  minWidth: 0,
  paddingRight: theme.space[2],
})

export const buttonStory = style({
  width: 'fit-content',
  height: 'fit-content',
  background: 'none',
  border: 'none',
  padding: `${theme.space['0.5']} ${theme.space[1]}`,
  textAlign: 'left',
})

export const imageProductStory = style({
  borderRadius: `${theme.radii.large} 0 0 ${theme.radii.large}`,
  background: theme.colors.neutral.backgroundStronger,
})

export const imageVariousStory = style({
  borderRadius: `${theme.radii.large} 0 0 ${theme.radii.large}`,
  background: theme.colors.neutral.backgroundStronger,
})

export const margedStackStory = style({
  marginLeft: theme.space[4],
})

export const cardStory = style({
  border: `1px solid ${theme.colors.neutral.borderWeak}`,
  borderRadius: theme.radii.large,
})
