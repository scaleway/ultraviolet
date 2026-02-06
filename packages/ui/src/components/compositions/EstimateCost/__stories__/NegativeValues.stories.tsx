import { EstimateCost } from '..'
import { Badge } from '../../../Badge'
import { Template } from './Template'

export const NegativeValues = Template.bind({})

NegativeValues.args = {
  children: [
    <EstimateCost.Item
      key="My Server"
      label="My server"
      monthlyPrice={100}
      subLabel="Here is subLabel text"
    >
      <EstimateCost.Strong>Powerful</EstimateCost.Strong>
      <EstimateCost.Regular>100 Cores</EstimateCost.Regular>
    </EstimateCost.Item>,
    <EstimateCost.Item
      key="Some storage"
      label="Some storage"
      monthlyPrice={100}
    >
      <EstimateCost.Strong>100 GB</EstimateCost.Strong>
    </EstimateCost.Item>,
    <EstimateCost.Item key="Discount" label="Discount" monthlyPrice={-100}>
      <EstimateCost.Strong>
        <Badge sentiment="success">50%</Badge>
      </EstimateCost.Strong>
    </EstimateCost.Item>,
  ],
  defaultTimeUnit: 'months',
}

NegativeValues.parameters = {
  docs: {
    description: {
      story:
        'In a `EstimateCost.Item` you could use a negative price to represent a discount. The total price will always be 0 or higher.',
    },
  },
}
