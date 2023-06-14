import { Template } from './Template.stories'

export const Closable = Template.bind({})

Closable.args = {
  children: 'This is a closable alert',
  sentiment: 'info',
  title: 'Information',
  buttonText: 'More info',
  onClickButton: () => alert('Button clicked'),
  closable: true,
}

Closable.parameters = {
  docs: {
    storyDescription:
      'If the children is long the content will be displayed as a column instead of a row.',
  },
}
