import { Template } from './Template.stories'

export const Placeholder = Template.bind({})

Placeholder.args = {
  ...Template.args,
  value: '',
  placeholder: 'This is the placeholder',
}

Placeholder.parameters = {
  docs: {
    description: {
      story: 'Mark `TextArea` as disabled using `disabled` property.',
    },
  },
}
