import type { ComponentStory } from '@storybook/react'
import { Button } from '..'

export const Download: ComponentStory<typeof Button> = ({ ...props }) => (
  <Button download icon="download" {...props} />
)

Download.parameters = {
  docs: {
    storyDescription: 'This shows how to use `download` on Button',
  },
}
