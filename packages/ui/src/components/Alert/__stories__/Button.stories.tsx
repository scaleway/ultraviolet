import { Template } from './Template.stories'

export const Button = Template.bind({})

Button.args = {
  variant: 'info',
  buttonText: 'More info',
  onButtonClick: () => alert('Button clicked'),
  title: 'Information',
  children: 'This is an alert content.',
}

Button.parameters = {
  docs: {
    storyDescription:
      'Using `Button` prop you can add a custom Button and use `onButtonClick` prop to handle the click event.',
  },
}
