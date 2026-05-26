import { Template } from './Template.stories'

export const WithDefaultCountry = Template.bind({})

WithDefaultCountry.args = {
  ...Template.args,
  defaultCountry: 'US',
  label: 'US Phone Number',
  name: 'usPhone',
}
