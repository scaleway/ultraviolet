/** eslint-disable @typescript-eslint/no-unsafe-assignment */
/** eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Badge } from '@ultraviolet/ui'
import { EstimateCost } from '..'
import { Template } from './Template'

export const NegativeValues = Template.bind({})

NegativeValues.args = {
  defaultTimeUnit: 'months',
  children: [
    <EstimateCost.Item
      label="My server"
      subLabel="Here is subLabel text"
      monthlyPrice={100}
    >
      <EstimateCost.Strong>Powerful</EstimateCost.Strong>
      <EstimateCost.Regular>100 Cores</EstimateCost.Regular>
    </EstimateCost.Item>,
    <EstimateCost.Item label="Some storage" monthlyPrice={100}>
      <EstimateCost.Strong>100 GB</EstimateCost.Strong>
    </EstimateCost.Item>,
    <EstimateCost.Item label="Discount" monthlyPrice={-100}>
      <EstimateCost.Strong>
        <Badge sentiment="success">50%</Badge>
      </EstimateCost.Strong>
    </EstimateCost.Item>,
  ],
}

NegativeValues.parameters = {
  docs: {
    description: {
      story:
        'In a `EstimateCost.Item` you could use a negative price to represent a discount. The total price will always be 0 or higher.',
    },
  },
}
