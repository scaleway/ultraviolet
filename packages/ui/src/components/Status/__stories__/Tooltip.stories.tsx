import { Template } from './Template.stories'

export const Tooltip = Template.bind({})
Tooltip.parameters = {
  docs: {
    storyDescription: 'Add a `tooltip` using tooltip property',
  },
}
Tooltip.args = {
  tooltip: 'A tooltip text',
  variant: 'success',
}
