import { EstimateCost } from '..'
import { Template } from './Template.stories'

export const Item = Template.bind({})

Item.args = {
  children: [
    <EstimateCost.Item
      key="My server"
      label="My server"
      price={0.017}
      subLabel="Here is subLabel text"
    >
      <EstimateCost.Strong>Powerful</EstimateCost.Strong>
      <EstimateCost.Regular>100 Cores</EstimateCost.Regular>
    </EstimateCost.Item>,
    <EstimateCost.Item key="Some storage" label="Some storage" price={0.001}>
      <EstimateCost.Strong>100 GB</EstimateCost.Strong>
    </EstimateCost.Item>,
  ],
}

Item.parameters = {
  docs: {
    description: {
      story:
        'Items are required to build and display your EstimateCost. In fact, `EstimateCost.Item` ' +
        'is use to display each items of your total price. You can define a bunch of parameters such as `label`, `subLabel`, `price`, ...',
    },
  },
}
