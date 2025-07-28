import { Template } from './Template.stories'

export const Double = Template.bind({})

Double.args = {
  double: true,
  input: true,
  label: 'Label',
  max: 10,
  min: 0,
  name: 'name',
}
