import { Template } from './Template.stories'

export const Helper = Template.bind({})
Helper.args = {
  label: 'Verification code',
  helper: 'Code sent to your email',
}

Helper.parameters = {
  docs: {
    description: {
      story:
        'You can use `helper` prop to provide additional information to the user',
    },
  },
}
