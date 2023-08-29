import { Template } from './Template.stories'

export const Error = Template.bind({})

Error.args = {
  name: 'error',
  legend: 'Legend label',
  error: 'Error content',
}

Error.parameters = {
  docs: {
    storyDescription: 'Use the `error` prop to set an error content.',
  },
}
