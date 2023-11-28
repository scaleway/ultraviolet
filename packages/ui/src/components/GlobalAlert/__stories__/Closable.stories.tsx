import { Template } from './Template.stories'

export const Closable = Template.bind({})

Closable.args = {
  children: 'Your trial has expired. Upgrade your plan to continue',
  variant: 'danger',
  closable: false,
}

Closable.parameters = {
  docs: {
    description: {
      story:
        'You can remove the close button by using the `closable` prop if you want the alert to be persistent.',
    },
  },
}
