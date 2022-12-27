import { Template } from './Template.stories'

export const Error = Template.bind({})

Error.args = {
  placeholder: 'Time',
  error: 'An error',
}

Error.parameters = {
  docs: {
    storyDescription: 'Fill `TimeInput` error using `error` property.',
  },
}
