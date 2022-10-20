import { Template } from './Template.stories'

export const Icon = Template.bind({})

Icon.args = {
  children: 'This is a notification bar with a custom icon',
  icon: 'clock-outline',
  type: 'beta',
}

Icon.parameters = {
  docs: {
    storyDescription:
      'Using `icon` prop you can add a custom icon to the notification.',
  },
}
