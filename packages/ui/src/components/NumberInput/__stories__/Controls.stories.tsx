import { Template } from './Template.stories'

export const Controls = Template.bind({})

Controls.args = {
  controls: false,
  disabled: false,
  id: 'number-input',
  label: 'Number Input',
  name: 'number-input',
  onChange: () => {},
  readOnly: false,
}

Controls.parameters = {
  docs: {
    description: {
      story: `The \`controls\` prop can be used to hide the "+" and "-" buttons on the input when set to false.`,
    },
  },
}
