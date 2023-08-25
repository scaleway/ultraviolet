import { Template } from './Template.stories'

export const Error = Template.bind({})

Error.args = {
  name: 'error',
  label: 'Legend label',
  error: 'Error content',
  helper: 'Helper content',
}

Error.parameters = {
  docs: {
    storyDescription: 'Use the `error` prop to set an error content.',
  },
}
