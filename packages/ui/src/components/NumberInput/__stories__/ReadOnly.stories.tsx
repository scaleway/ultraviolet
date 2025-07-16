import { Template } from './Template.stories'

export const ReadOnly = Template.bind({})

ReadOnly.args = {
  readOnly: true,
  id: 'number-input',
  label: 'Number Input',
  name: 'number-input',
  onChange: () => {},
  value: 50,
}

ReadOnly.parameters = {
  docs: {
    description: {
      story: `The \`readOnly\` prop can be used to disable the input. Read only inputs cannot be focused but can be highlighted.`,
    },
  },
}
