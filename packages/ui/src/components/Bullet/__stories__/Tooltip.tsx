import { Template } from './Template'

export const Tooltip = Template.bind({})

Tooltip.args = {
  text: '1',
  tooltip: 'tooltip text',
}

Tooltip.parameters = {
  docs: {
    storyDescription: 'Add a `tooltip` using tooltip property',
  },
}
