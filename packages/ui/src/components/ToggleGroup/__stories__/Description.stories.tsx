import { Template } from './Template.stories'

export const Description = Template.bind({})

Description.args = {
  description: 'You can either select one or multiple options.',
}

Description.parameters = {
  docs: {
    description: {
      story: 'Use the `description` prop to add more details about this group.',
    },
  },
}
