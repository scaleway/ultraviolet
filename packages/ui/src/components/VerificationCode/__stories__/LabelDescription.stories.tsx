import { Badge } from '../../Badge'
import { Template } from './Template.stories'

export const LabelDescription = Template.bind({})
LabelDescription.args = {
  label: 'Verification code',
  labelDescription: (
    <Badge sentiment="warning" size="small">
      3 trials left
    </Badge>
  ),
}

LabelDescription.parameters = {
  docs: {
    description: {
      story:
        'You can use `labelDescription` prop to provide additional information about the input field.',
    },
  },
}
