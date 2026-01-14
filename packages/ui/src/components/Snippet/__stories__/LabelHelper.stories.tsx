import { Badge } from '../../Badge'
import { Template } from './Template.stories'

export const LabelHelper = Template.bind({})

LabelHelper.args = {
  children: 'pnpm add @ultraviolet/ui',
  helper: 'helper',
  label: 'Label',
  labelDescription: (
    <Badge sentiment="success" size="small">
      new
    </Badge>
  ),
}

LabelHelper.parameters = {
  docs: {
    description: {
      story:
        'Like an input, it is possible to add a label, labelDescription and helper.',
    },
  },
}
