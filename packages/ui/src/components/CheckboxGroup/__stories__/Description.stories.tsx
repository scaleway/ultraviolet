import { Template } from './Template.stories'

export const Description = Template.bind({})

Description.args = {
  description: 'You can either accept or decline the conditions.',
}

Description.parameters = {
  docs: {
    description: {
      story: 'Use the `description` prop to set an helper content.',
    },
  },
}
