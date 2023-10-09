import { Template } from './Template.stories'

export const Error = Template.bind({})
Error.args = {
  error: true,
}

Error.parameters = {
  docs: {
    description: {
      story:
        'You can use `error` prop to indicate an error with the current value',
    },
  },
}
