import { Template } from './Template'

export const Tooltip = Template.bind({})

Tooltip.args = {
  text: '1',
  tooltip: 'tooltip text',
}

Tooltip.parameters = {
  docs: {
    description: { story: 'Add a `tooltip` using tooltip property' },
  },
}
