import { Template } from './Template.stories'

export const Title = Template.bind({})

Title.args = {
  variant: 'info',
  title: 'Information',
  children: 'This is an alert content.',
}

Title.parameters = {
  docs: {
    storyDescription:
      'Using `title` prop you can add a custom title to the notification.',
  },
}
