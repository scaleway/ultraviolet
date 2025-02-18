import { Badge } from '@ultraviolet/ui'
import { Template } from './Template.stories'

const overallDiscount = {
  label: (
    <Badge sentiment="warning" prominence="strong" size="small">
      50% OFF DURING BETA
    </Badge>
  ),
  discount: 0.5,
}
export const OverallDiscount = Template.bind({})

OverallDiscount.args = { ...Template.args, overallDiscount }
