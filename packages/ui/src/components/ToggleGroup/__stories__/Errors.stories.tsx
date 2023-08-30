import { Template } from './Template.stories'

export const Error = Template.bind({})

Error.args = {
  error: 'At least one option must be enabled',
  value: [],
}

Error.parameters = {
  docs: {
    storyDescription: 'Use the `error` prop to set an error content.',
  },
}
