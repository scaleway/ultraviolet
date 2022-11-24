import { Template } from './Template.stories'

export const Title = Template.bind({})

Title.args = {
  icon: 'information-outline',
  type: 'info',
  title: 'Information',
  children: 'This is a notification bar with a custom title.',
}

Title.parameters = {
  docs: {
    storyDescription:
      'Using `title` prop you can add a custom title to the notification.',
  },
}
