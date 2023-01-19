import { Template } from './Template.stories'

export const Disabled = Template.bind({})

Disabled.args = {
  label: 'First Name',
  disabled: true,
}

Disabled.parameters = {
  docs: {
    storyDescription: 'Mark `TextInput` as disabled using `disabled` property.',
  },
}
