import { Template } from './Template.stories'

export const ValidRequired = Template.bind({})

ValidRequired.args = {
  label: 'First Name',
  valid: true,
  required: true,
}
