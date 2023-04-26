import { Template } from './Template'

export const Error = Template.bind({})

Error.parameters = {
  docs: {
    storyDescription:
      'Use `error` prop to style the input when the field is invalid.',
  },
}

Error.args = {
  label: 'Error',
  error: 'This is an error',
}
