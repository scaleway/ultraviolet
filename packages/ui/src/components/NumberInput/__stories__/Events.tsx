import { Template } from './Template'

export const Events = Template.bind({})

Events.args = {
  minValue: 50,
  maxValue: 100,
  defaultValue: 50,
  onChange: () => console.log('onChange'),
  onFocus: () => console.log('onFocus'),
  onBlur: () => console.log('onBlur'),
  onMinCrossed: () => console.log('onMinCrossed'),
  onMaxCrossed: () => console.log('onMaxCrossed'),
}
