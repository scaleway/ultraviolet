import { Template } from './Template.stories'

export const Step = Template.bind({})

Step.args = {
  id: 'number-input',
  label: 'Number Input',
  name: 'number-input',
  onChange: () => {},
  step: 10,
}

Step.parameters = {
  docs: {
    description: {
      story: `You can use the \`step\` prop to define the step of the input. In this example the step is set to \`10\` so the input will increment/decrement by 10.`,
    },
  },
}
