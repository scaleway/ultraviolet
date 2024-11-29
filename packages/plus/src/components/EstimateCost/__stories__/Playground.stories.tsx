import { EstimateCost } from '..'
import { Template } from './Template'

export const Playground = Template.bind({})

Playground.args = {
  children: [
    <EstimateCost.Item
      key={1}
      label="My server"
      subLabel="Here is subLabel text"
      price={0.1}
    >
      <EstimateCost.Strong>Powerful</EstimateCost.Strong>
      <EstimateCost.Regular>100 Cores</EstimateCost.Regular>
    </EstimateCost.Item>,
    <EstimateCost.Item key={2} label="Some storage" price={0.2}>
      <EstimateCost.Strong>100 GB</EstimateCost.Strong>
    </EstimateCost.Item>,
  ],
}
