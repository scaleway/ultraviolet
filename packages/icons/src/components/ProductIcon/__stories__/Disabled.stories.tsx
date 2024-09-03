import { Template } from './Template.stories'

export const Disabled = Template.bind({})
Disabled.args = {
  variant: 'primary',
  size: 'large',
  disabled: true,
}

Disabled.parameters = {
  docs: {
    description: {
      story:
        'Use `disabled` prop to change the icon color to disabled. It will work on any variant and will always give the same disable colors.',
    },
  },
}
