import { EstimateCost } from '..'
import { Template } from './Template'

export const GlobalDiscount = Template.bind({})

GlobalDiscount.args = {
  children: [
    <EstimateCost.Item label="Storage" price={0.001} unit="GB" amount={100}>
      <EstimateCost.Unit unit="GB" />
    </EstimateCost.Item>,
    <EstimateCost.Item label="Screen pixels" price={1} unit="Px" amount={100}>
      <EstimateCost.Unit />
    </EstimateCost.Item>,
  ],
  isBeta: true,
  discount: 0,
}

GlobalDiscount.parameters = {
  docs: {
    description: {
      story:
        'A global or local discount can be applied to your total using `discount` prop that take a value between 0 and 1 (ex: 0.5 equivalent to 50% discount).<br/>' +
        'To make it global just add the prop `discount` to `EstimateCost`. Also you can use the prop `isBeta` to show a beta badge with the discount value.',
    },
  },
}
