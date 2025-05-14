import { Badge } from '@ultraviolet/ui'
import { Template } from './Template.stories'

export const TotalPriceInfo = Template.bind({})

TotalPriceInfo.args = {
  ...Template.args,
  discount: 0.5,
  totalPriceInfo: (
    <Badge sentiment="warning" prominence="strong" size="small">
      50% OFF DURING BETA
    </Badge>
  ),
  hideTimeUnit: false,
}

TotalPriceInfo.parameters = {
  docs: {
    description: {
      story: 'Add information right beneath the total price.',
    },
  },
}
