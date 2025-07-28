import { EstimateCost } from '..'
import { Template } from './Template'

export const NumberInput = Template.bind({})

NumberInput.args = {
  children: [
    <EstimateCost.Item
      amountFree={2}
      key="Number of million queries"
      label="Number of million queries"
      price={0.01}
      subLabel="2 million queries free"
      unit="per million"
    >
      <EstimateCost.NumberInput amount={1} />
    </EstimateCost.Item>,
    <EstimateCost.Item
      amount={50}
      key="Chocolates"
      label="Chocolates"
      price={1}
      subLabel="Chocolate is never free :("
      unit="chocolate"
    >
      <EstimateCost.NumberInput maxValue={51} minValue={0} />
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
