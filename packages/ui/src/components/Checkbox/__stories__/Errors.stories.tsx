import { Template } from './Template.stories'

export const Errors = Template.bind({})

Errors.storyName = 'Error'

Errors.args = {
  error: 'An error message',
  helper: 'Helper',
}
Errors.parameters = {
  docs: {
    description: {
      story: 'Set validation with error message using `error` property.',
    },
  },
}
