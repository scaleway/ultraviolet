import { Template } from './Template.stories'

export const Button = Template.bind({})

Button.args = {
  children: 'Your trial has expired. Upgrade your plan to continue',
  variant: 'info',
  buttonText: 'Upgrade',
  onClickButton: () => {},
}

Button.parameters = {
  docs: {
    description: {
      story:
        'You can add a button to the alert by using the `buttonText` and `onClickButton` props.',
    },
  },
}
