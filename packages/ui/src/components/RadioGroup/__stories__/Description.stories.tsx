import { Template } from './Template.stories'

export const Description = Template.bind({})

Description.args = {
  name: 'helper',
  legend: 'Legend label',
  description: 'Choose the option that best fits your needs',
}

Description.parameters = {
  docs: {
    description: {
      story: 'Use the `description` prop to add more details about this group.',
    },
  },
}
