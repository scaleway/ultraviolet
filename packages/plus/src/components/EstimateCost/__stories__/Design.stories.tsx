import { EstimateCost } from '..'
import frFlag from './assets/fr.svg'
import { Template } from './Template'

export const Design = Template.bind({})

Design.args = {
  children: [
    <EstimateCost.Region label="PAR" image={frFlag} />,
    <EstimateCost.Item label="Server" price={0.01} noBorder />,
    <EstimateCost.Item label="CPU" tabulation={3} noPrice noBorder>
      <EstimateCost.Regular>4 Cores</EstimateCost.Regular>
    </EstimateCost.Item>,
    <EstimateCost.Item label="RAM" tabulation={3} noPrice noBorder>
      <EstimateCost.Regular>8 GB</EstimateCost.Regular>
    </EstimateCost.Item>,
    <EstimateCost.Item label="SSD" tabulation={3} noPrice noBorder>
      <EstimateCost.Regular>50 GB</EstimateCost.Regular>
    </EstimateCost.Item>,
  ],
}

Design.parameters = {
  docs: {
    description: {
      story:
        'There are multiple design prop that you can change to show each item differently.<br/>' +
        '- `tabulation` can be used to add padding left on label of the item<br/>' +
        '- `noPrice` can be used to remove price of the item<br/>' +
        '- `noBorder` can be used to removed bottom border of the item<br/>' +
        '- `hideFromOverlay` will hide the item from overlay<br/>' +
        '- `shouldBeHidden` will hide the item from overlay on small screens<br/>',
    },
  },
}
