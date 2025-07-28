import { Template } from './Template.stories'

export const Placeholder = Template.bind({})

Placeholder.args = {
  ...Template.args,
  placeholder: 'This is the placeholder',
  value: '',
}

Placeholder.parameters = {
  docs: {
    description: {
      story: 'Mark `TextArea` as disabled using `disabled` property.',
    },
  },
}
