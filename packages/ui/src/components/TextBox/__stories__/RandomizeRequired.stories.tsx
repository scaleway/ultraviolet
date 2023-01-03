import { Template } from './Template.stories'

export const RandomizeRequired = Template.bind({})

RandomizeRequired.args = {
  label: 'Random',
  required: true,
  random: 'prefix',
}
