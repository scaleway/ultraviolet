import { EstimateCost } from '..'
import { Template } from './Template'

export const LocalDiscount = Template.bind({})

LocalDiscount.args = {
  children: [
    <EstimateCost.Item label="Storage" price={0.001} unit="GB" amount={100}>
      <EstimateCost.Unit unit="GB" />
    </EstimateCost.Item>,
    <EstimateCost.Item
      discount={0.5}
      subLabel="This item is 50% discount"
      label="Screen pixels"
      price={1}
      unit="Px"
      amount={100}
    >
      <EstimateCost.Unit />
    </EstimateCost.Item>,
  ],
}

LocalDiscount.parameters = {
  docs: {
    storyDescription:
      'To make it local to one item add prop `discount` to the desired item `EstimateCost.Item`',
  },
}
