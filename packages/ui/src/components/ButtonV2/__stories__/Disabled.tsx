import { Template } from './Template'

export const Disabled = Template.bind({})

Disabled.args = {
  ...Template.args,
  disabled: true,
}

Disabled.parameters = {
  docs: {
    storyDescription:
      'You can use the prop `disable` to disable a Button. Please note that `isLoading` prop also disable the button.',
  },
}
