import { Template } from './Template.stories'

export const Double = Template.bind({})

Double.args = { ...Template.args, value: [3, 5], step: 0.5 }

Double.parameters = {
  docs: {
    description: {
      story:
        'When passing an array of number instead of a number, it is possible to create a range slider..',
    },
  },
}
