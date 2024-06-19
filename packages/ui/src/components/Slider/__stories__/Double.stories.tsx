import { Template } from './Template.stories'

export const Double = Template.bind({})

Double.args = { ...Template.args, double: true, value: [3, 5], step: 0.5 }

Double.parameters = {
  docs: {
    description: {
      story:
        'With prop `double`, it is possible to select a range. Make sure to pass an array of two numbers for the value.',
    },
  },
}
