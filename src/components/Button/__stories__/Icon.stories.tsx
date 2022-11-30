import { ComponentStory } from '@storybook/react'
import Button from '..'

export const Icon: ComponentStory<typeof Button> = ({ ...props }) => (
  <Button icon="lock" {...props}>
    With text
  </Button>
)

Icon.parameters = {
  docs: {
    storyDescription:
      'This shows how to use `icon` on Button. You can specify the name of the icon or the icon itself.',
  },
}
