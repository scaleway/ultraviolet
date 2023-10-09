import { Template } from './Template.stories'

export const Button = Template.bind({})

Button.args = {
  sentiment: 'info',
  buttonText: 'More info',
  onClickButton: () => alert('Button clicked'),
  title: 'Information',
  children: 'This is an alert content.',
}

Button.parameters = {
  docs: {
    description: {
      story:
        'Using `Button` prop you can add a custom Button and use `onClickButton` prop to handle the click event.',
    },
  },
}
