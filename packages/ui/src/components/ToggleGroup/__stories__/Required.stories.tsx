import { Template } from './Template.stories'

export const Required = Template.bind({})

Required.args = {
  required: true,
}

Required.parameters = {
  docs: {
    description: {
      story: 'Use the `Required` prop to change the Required of the group.',
    },
  },
}
