import { Template } from './Template.stories'

export const Multiline = Template.bind({})

Multiline.args = {
  label: 'First Name',
  multiline: true,
}

Multiline.parameters = {
  docs: {
    description: { story: 'Enable multiline mode using `multiline` property.' },
  },
}
