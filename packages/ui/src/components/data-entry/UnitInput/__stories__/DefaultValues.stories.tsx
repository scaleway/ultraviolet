import { Template } from './Template.stories'

export const DefaultValues = Template.bind({})

DefaultValues.args = {
  ...Template.args,
  label: 'Label',
  unitValue: 'days',
  value: 10,
}
