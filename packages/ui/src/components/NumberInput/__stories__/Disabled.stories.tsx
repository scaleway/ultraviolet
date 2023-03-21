import { Template } from './Template.stories'

export const Disabled = Template.bind({})

Disabled.args = {
  minValue: 0,
  maxValue: 100,
  disabled: true,
}
