import { Template } from './Template.stories'

export const Button = Template.bind({})

Button.args = {
  buttonText: 'Upgrade',
  children: 'Your trial has expired. Upgrade your plan to continue',
  onClickButton: () => {},
  variant: 'info',
}

Button.parameters = {
  docs: {
    description: {
      story:
        'You can add a button to the alert by using the `buttonText` and `onClickButton` props.',
    },
  },
}
