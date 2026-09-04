import { PencilIcon } from '@ultraviolet/icons/PencilIcon'
import { Template } from './Template.stories'

export const IconOnly = Template.bind({})

IconOnly.args = {
  ...Template.args,
  accessibleLabel: 'edit',
  children: <PencilIcon />,
}

IconOnly.parameters = {
  docs: {
    description: {
      story:
        'To define a button with an icon only you can simply pass your icon into the children. You have to provide a label using either the `accessibleLabel` prop or the `tooltipLabel` prop.',
    },
  },
}
