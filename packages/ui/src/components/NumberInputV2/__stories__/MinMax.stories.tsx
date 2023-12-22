import { Template } from './Template.stories'

export const MinMax = Template.bind({})

MinMax.args = {
  id: 'number-input',
  label: 'Number Input',
  name: 'number-input',
  onChange: () => {},
  helper: 'You should enter a number between 0 and 100',
  min: 0,
  max: 100,
}

MinMax.parameters = {
  docs: {
    description: {
      story: `The \`min\` and \`max\` props can be used to define the minimum and maximum values that can be entered in the input.`,
    },
  },
}
