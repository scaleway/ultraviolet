import { Template } from './Template.stories'

export const Default = Template.bind({})

Default.args = {
  defaultCountry: 'US',
  label: 'Phone Number',
  name: 'phone',
  placeholder: 'Enter phone number',
}
