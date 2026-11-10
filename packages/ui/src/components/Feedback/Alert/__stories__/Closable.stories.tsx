import { Button } from '../../../Action/Button'
import { Template } from './Template.stories'

export const Closable = Template.bind({})

Closable.args = {
  action: ({ buttonProps }) => (
    <Button {...buttonProps} onClick={() => alert('Button clicked')}>
      More info
    </Button>
  ),
  children: 'This is a closable alert',
  closable: true,
  sentiment: 'info',
  title: 'Information',
}

Closable.parameters = {
  docs: {
    description: {
      story: 'If the children is long the content will be displayed as a column instead of a row.',
    },
  },
}
