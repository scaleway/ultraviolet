import { Template } from './Template.stories'

export const Disabled = Template.bind({})

Disabled.args = {
  disabled: true,
}

Disabled.parameters = {
  docs: {
    storyDescription: 'You can disable the input by passing `disabled` prop.',
  },
}
