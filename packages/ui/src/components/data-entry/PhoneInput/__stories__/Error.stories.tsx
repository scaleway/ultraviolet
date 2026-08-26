import { Template } from './Template.stories'

export const WithError = Template.bind({})

WithError.args = {
  ...Template.args,
  error: 'Invalid phone number format',
}
