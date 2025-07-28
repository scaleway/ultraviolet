import { Template } from './Template.stories'

export const Error = Template.bind({})

Error.args = {
  error: 'Error content',
  legend: 'Legend label',
  name: 'error',
}

Error.parameters = {
  docs: {
    description: { story: 'Use the `error` prop to set an error content.' },
  },
}
