import { Template } from './Template'

export const Tooltip = Template.bind({})

Tooltip.args = {
  children: '1',
  tooltipLabel: 'tooltip text',
}

Tooltip.parameters = {
  docs: {
    description: { story: 'Add a description using the `tooltipDescription` prop' },
  },
}
