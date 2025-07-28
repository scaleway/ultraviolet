import { Template } from './Template'

export const Error = Template.bind({})

Error.parameters = {
  docs: {
    description: {
      story: 'Use `error` prop to style the input when the field is invalid.',
    },
  },
}

Error.args = {
  error: 'This is an error',
  label: 'Error',
}

Error.decorators = [
  StoryComponent => (
    <div style={{ height: '350px' }}>
      <StoryComponent />
    </div>
  ),
]
