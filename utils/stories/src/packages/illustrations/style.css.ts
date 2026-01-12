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
  background: 'none',
  border: 'none',
  height: 'fit-content',
  padding: `${theme.space['0.5']} ${theme.space[1]}`,
  textAlign: 'left',
  width: 'fit-content',
})

export const imageProductStory = style({
  background: theme.colors.neutral.backgroundStronger,
  borderRadius: `${theme.radii.large} 0 0 ${theme.radii.large}`,
})

export const imageVariousStory = style({
  background: theme.colors.neutral.backgroundStronger,
  borderRadius: `${theme.radii.large} 0 0 ${theme.radii.large}`,
})

export const margedStackStory = style({
  marginLeft: theme.space[4],
})

export const cardStory = style({
  border: `1px solid ${theme.colors.neutral.borderWeak}`,
  borderRadius: theme.radii.large,
})
