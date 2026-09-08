import { Template } from './Template.stories'

export const Disabled = Template.bind({})

Disabled.args = {
  ...Template.args,
  disabled: true,
}

Disabled.parameters = {
  docs: {
    description: {
      story: 'Mark `TextArea` as disabled using `disabled` property.',
    },
  },
}
