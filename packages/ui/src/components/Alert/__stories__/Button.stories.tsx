import { Template } from './Template.stories'

export const Button = Template.bind({})

Button.args = {
  buttonText: 'More info',
  children: 'This is an alert content.',
  onClickButton: () => alert('Button clicked'),
  sentiment: 'info',
  title: 'Information',
}

Button.parameters = {
  docs: {
    description: {
      story:
        'Using `Button` prop you can add a custom Button and use `onClickButton` prop to handle the click event.',
    },
  },
}
