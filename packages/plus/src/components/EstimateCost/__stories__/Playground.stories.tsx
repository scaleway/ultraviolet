import { Badge } from '@ultraviolet/ui'
import { EstimateCost } from '..'
import { Template } from './Template'

export const Playground = Template.bind({})

Playground.args = {
  children: [
    <EstimateCost.Item
      label="My server"
      subLabel="Here is subLabel text"
      price={100}
    >
      <EstimateCost.Strong>Powerful</EstimateCost.Strong>
      <EstimateCost.Regular>100 Cores</EstimateCost.Regular>
    </EstimateCost.Item>,
    <EstimateCost.Item label="Some storage" price={100}>
      <EstimateCost.Strong>100 GB</EstimateCost.Strong>
    </EstimateCost.Item>,
    <EstimateCost.Item label="Discount" price={-100}>
      <EstimateCost.Strong>
        <Badge sentiment="success">50%</Badge>
      </EstimateCost.Strong>
    </EstimateCost.Item>,
  ],
}
