import { Template } from './Template.stories'

export const Title = Template.bind({})

Title.args = {
  sentiment: 'info',
  title: 'Information',
  children: 'This is an alert content.',
}

Title.parameters = {
  docs: {
    description: {
      story:
        'Using `title` prop you can add a custom title to the notification.',
    },
  },
}
