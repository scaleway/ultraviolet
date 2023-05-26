import { Template } from './Template.stories'

export const Error = Template.bind({})

Error.args = {
  minValue: 0,
  maxValue: 100,
  error: 'There is an error',
}
