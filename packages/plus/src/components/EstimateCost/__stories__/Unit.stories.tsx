import { EstimateCost } from '..'
import { Template } from './Template'

export const Unit = Template.bind({})

Unit.args = {
  children: [
    <EstimateCost.Item
      label="Storage"
      subLabel="50 GB Free"
      price={0.001}
      unit="samples"
      amountFree={50}
      amount={100}
    >
      <EstimateCost.Unit unit="GB" />
    </EstimateCost.Item>,
    <EstimateCost.Item label="Screen pixels" price={1} unit="Px" amount={100}>
      <EstimateCost.Unit />
    </EstimateCost.Item>,
    <EstimateCost.Item label="Screen pixels" price={1} unit="Px" amount={100}>
      <EstimateCost.Regular>Test</EstimateCost.Regular>
    </EstimateCost.Item>,
  ],
}

Unit.parameters = {
  docs: {
    description: {
      story:
        'Item unit is an interactive input. It allows customers to change the value to see how much it will cost. <br/>' +
        'The component `EstimateCost.Item` include a prop called `amountFree` as number. This number is deducted to NumberInput ' +
        'value (check example with 50 GB Free).' +
        '<br/><br/>' +
        'You can get value of the amount set in NumberInput by using `getAmountValue` prop.',
    },
  },
}
