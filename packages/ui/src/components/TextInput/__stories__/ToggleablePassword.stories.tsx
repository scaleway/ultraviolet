import { Template } from './Template.stories'

export const ToggleablePassword = Template.bind({})

ToggleablePassword.args = {
  label: 'Password',
  defaultValue: 'my-safe-password',
  type: 'toggleable-password',
}

ToggleablePassword.parameters = {
  docs: {
    storyDescription:
      'Set type to `toggleable-password` adds a eye toggle to display typed password **This behaviour is dangerous, use it only when the user fills a new password.**',
  },
}
