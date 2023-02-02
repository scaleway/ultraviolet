import { Template } from './Template.stories'

export const Steps = Template.bind({})

Steps.args = {
  minValue: 0,
  maxValue: 100,
  value: 10,
  step: 10,
}

Steps.parameters = {
  docs: {
    storyDescription:
      'You can change step size of your `NumberInput` component. If you set it to 10 for example, your `NumberInput` will increase & decrease by steps of 10.',
  },
}
