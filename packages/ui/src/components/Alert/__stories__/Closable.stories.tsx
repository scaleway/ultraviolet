import { Template } from './Template.stories'

export const Closable = Template.bind({})

Closable.args = {
  buttonText: 'More info',
  children: 'This is a closable alert',
  closable: true,
  onClickButton: () => alert('Button clicked'),
  sentiment: 'info',
  title: 'Information',
}

Closable.parameters = {
  docs: {
    description: {
      story:
        'If the children is long the content will be displayed as a column instead of a row.',
    },
  },
}
