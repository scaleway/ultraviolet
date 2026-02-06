import { EstimateCost } from '..'
import { Template } from './Template'

export const LocalDiscount = Template.bind({})

LocalDiscount.args = {
  children: [
    <EstimateCost.Item
      amount={100}
      key="Storage"
      label="Storage"
      price={0.001}
      unit="GB"
    >
      <EstimateCost.Unit unit="GB" />
    </EstimateCost.Item>,
    <EstimateCost.Item
      amount={100}
      discount={0.5}
      key="Screen pixels"
      label="Screen pixels"
      price={1}
      subLabel="This item is 50% discount"
      unit="Px"
    >
      <EstimateCost.Unit />
    </EstimateCost.Item>,
  ],
}

LocalDiscount.parameters = {
  docs: {
    description: {
      story:
        'To make it local to one item add prop `discount` to the desired item `EstimateCost.Item`',
    },
  },
}
