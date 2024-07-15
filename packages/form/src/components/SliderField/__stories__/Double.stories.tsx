import { Template } from './Template.stories'

export const Double = Template.bind({})

Double.args = {
  double: true,
  input: true,
  min: 0,
  max: 10,
  label: 'Label',
  name: 'name',
}
