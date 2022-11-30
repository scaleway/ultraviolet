import { ComponentStory } from '@storybook/react'
import Button from '..'

export const Disabled: ComponentStory<typeof Button> = ({ ...props }) => (
  <Button disabled {...props}>
    Disabled
  </Button>
)

Disabled.parameters = {
  docs: {
    storyDescription: 'This shows how to use `disabled` on Button.',
  },
}

Disabled.args = {
  disabled: true,
  icon: 'plus',
  variant: 'primary-bordered',
}
