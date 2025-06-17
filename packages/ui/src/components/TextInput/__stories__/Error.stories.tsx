import { Template } from './Template.stories'

export const Error = Template.bind({})

Error.args = {
  ...Template.args,
  error: 'Error during field update',
}
