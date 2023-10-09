import { Template } from './Template.stories'

export const Notice = Template.bind({})

Notice.args = {
  label: 'First Name',
  notice: 'A notice',
}

Notice.parameters = {
  docs: {
    description: {
      story:
        'Display an information under `TextInput` using `notice` property.',
    },
  },
}
