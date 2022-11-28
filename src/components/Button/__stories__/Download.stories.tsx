import { ComponentStory } from '@storybook/react'
import Button from '..'

export const Download: ComponentStory<typeof Button> = () => (
  <Button download icon="download" />
)

Download.parameters = {
  docs: {
    storyDescription: 'This shows how to use `download` on Button',
  },
}
