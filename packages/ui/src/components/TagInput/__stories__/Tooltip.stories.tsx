import { Template } from './Template.stories'

export const Tooltip = Template.bind({})

Tooltip.args = {
  ...Template.args,
  tooltip: 'Tooltip text',
}
