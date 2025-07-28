import { Badge } from '@ultraviolet/ui'
import { Template } from './Template.stories'

export const TotalPriceInfo = Template.bind({})

TotalPriceInfo.args = {
  ...Template.args,
  discount: 0.5,
  hideTimeUnit: false,
  totalPriceInfo: (
    <Badge prominence="strong" sentiment="warning" size="small">
      50% OFF DURING BETA
    </Badge>
  ),
}

TotalPriceInfo.parameters = {
  docs: {
    description: {
      story: 'Add information right beneath the total price.',
    },
  },
}
