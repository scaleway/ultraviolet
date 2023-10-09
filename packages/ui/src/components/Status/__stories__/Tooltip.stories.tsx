import { Template } from './Template.stories'

export const Tooltip = Template.bind({})
Tooltip.parameters = {
  docs: {
    description: { story: 'Add a `tooltip` using tooltip property' },
  },
}
Tooltip.args = {
  tooltip: 'A tooltip text',
  sentiment: 'success',
}
