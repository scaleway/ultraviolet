import { Template } from './Template.stories'

export const Disabled = Template.bind({})

Disabled.args = {
  disabled: true,
  children: 'Disabled',
  icon: 'plus',
  variant: 'primary-bordered',
}

Disabled.parameters = {
  docs: {
    storyDescription: 'This shows how to use `disabled` on Button.',
  },
}
