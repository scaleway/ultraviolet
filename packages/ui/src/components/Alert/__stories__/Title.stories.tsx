import { Template } from './Template.stories'

export const Title = Template.bind({})

Title.args = {
  children: 'This is an alert content.',
  sentiment: 'info',
  title: 'Information',
}

Title.parameters = {
  docs: {
    description: {
      story:
        'Using `title` prop you can add a custom title to the notification.',
    },
  },
}
