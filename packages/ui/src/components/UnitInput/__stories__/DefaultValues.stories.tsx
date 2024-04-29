import { Template } from './Template.stories'

export const DefaultValues = Template.bind({})

DefaultValues.args = {
  ...Template.args,
  label: 'Label',
  value: 10,
  unitValue: 'days',
}
