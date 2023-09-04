import { Template } from './Template.stories'

export const Error = Template.bind({})

Error.args = {
  error: 'Terms and condition should be accepted to continue.',
}

Error.parameters = {
  docs: {
    storyDescription: 'Use the `error` prop to set an error content.',
  },
}
