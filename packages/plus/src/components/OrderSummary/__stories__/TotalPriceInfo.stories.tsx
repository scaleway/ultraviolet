import { Badge } from '@ultraviolet/ui'
import { Template } from './Template.stories'

export const TotalPriceInfo = Template.bind({})

TotalPriceInfo.args = {
  ...Template.args,
  discount: 0.5,
  hideBeforePrice: false,
  hideTimeUnit: false,
  totalPriceInfo: (
    <Badge prominence="strong" sentiment="warning" size="small">
      50% OFF DURING BETA
    </Badge>
  ),
  totalPriceInfoPlacement: 'left',
}

TotalPriceInfo.parameters = {
  docs: {
    description: {
      story:
        'Add information right beneath the total price. You can place it on the left or the right using prop `totalPriceInfoPlacement`. You can also hide the undiscounted price using prop `hideBeforePrice`.',
    },
  },
}
