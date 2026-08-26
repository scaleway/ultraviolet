import { Template } from './Template.stories'

export const Error = Template.bind({})

Error.args = {
  error: 'An error',
  label: 'Label',
}

Error.parameters = {
  docs: {
    description: { story: 'Fill `TimeInput` error using `error` property.' },
  },
}
