import { Template } from './Template.stories'

export const Controls = Template.bind({})

Controls.args = {
  readOnly: false,
  disabled: false,
  id: 'number-input',
  label: 'Number Input',
  name: 'number-input',
  onChange: () => {},
  controls: false,
}

Controls.parameters = {
  docs: {
    description: {
      story: `The \`controls\` prop can be used to hide the "+" and "-" buttons on the input when set to false.`,
    },
  },
}
