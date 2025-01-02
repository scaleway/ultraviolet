import { Template } from './Template.stories'

export const Error = Template.bind({})

Error.args = {
  error: 'An error',
}

Error.parameters = {
  docs: {
    description: { story: 'Fill `TimeInput` error using `error` property.' },
  },
}
