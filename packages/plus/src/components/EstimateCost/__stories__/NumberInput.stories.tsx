import { EstimateCost } from '..'
import { Template } from './Template'

export const NumberInput = Template.bind({})

NumberInput.args = {
  children: [
    <EstimateCost.Item
      key="Number of million queries"
      label="Number of million queries"
      subLabel="2 million queries free"
      amountFree={2}
      price={0.01}
      unit="per million"
    >
      <EstimateCost.NumberInput amount={1} />
    </EstimateCost.Item>,
    <EstimateCost.Item
      key="Chocolates"
      label="Chocolates"
      subLabel="Chocolate is never free :("
      price={1}
      unit="chocolate"
      amount={50}
    >
      <EstimateCost.NumberInput minValue={0} maxValue={51} />
    </EstimateCost.Item>,
  ],
}

NumberInput.parameters = {
  docs: {
    description: {
      story:
        'Item NumberInput is an interactive input. It allows user to change the amount of an item and see how much it will cost. <br/>' +
        'The component `EstimateCost.Item` include a prop called `amountFree` as number. This number is deducted to NumberInput value ' +
        '(check example with 2 million queries free).' +
        '<br/><br/>' +
        'You can get value of the amount set in NumberInput by using `getAmountValue` prop. <br/>You can hide controls in NumberInput by using `controls` prop.',
    },
  },
}
