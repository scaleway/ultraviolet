import { Template } from './Template.stories'

export const Error = Template.bind({})

Error.args = {
  placeholder: 'Placeholder',
  error: 'An error',
}

Error.parameters = {
  docs: {
    storyDescription: 'Fill `TextBox` error using `error` property.',
  },
}
