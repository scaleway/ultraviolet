import { Template } from './Template.stories'

export const LongChildren = Template.bind({})

LongChildren.args = {
  buttonText: 'More info',
  children:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  closable: true,
  onClickButton: () => alert('Button clicked'),
  sentiment: 'info',
  title: 'Information',
}

LongChildren.parameters = {
  docs: {
    description: {
      story:
        'If the children is long the content will be displayed as a column instead of a row.',
    },
  },
}
