import { ComponentStory } from '@storybook/react'
import Button from '..'

export const Link: ComponentStory<typeof Button> = ({ ...props }) => (
  <Button href="https://scaleway.com" target="_blank" {...props}>
    Scaleway
  </Button>
)

Link.parameters = {
  docs: {
    storyDescription: 'This shows how to use `href` and `target` on Button.',
  },
}
