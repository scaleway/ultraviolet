import { Badge } from '../../Badge'
import { Template } from './Template'

export const LabelDescription = Template.bind({})

LabelDescription.args = {
  children: 'Label',
  labelDescription: (
    <Badge sentiment="info" size="small">
      badge
    </Badge>
  ),
}
