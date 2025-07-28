import { Template } from './Template.stories'

export const Description = Template.bind({})

Description.args = {
  description: 'Choose the option that best fits your needs',
  legend: 'Legend label',
  name: 'helper',
}

Description.parameters = {
  docs: {
    description: {
      story: 'Use the `description` prop to add more details about this group.',
    },
  },
}
