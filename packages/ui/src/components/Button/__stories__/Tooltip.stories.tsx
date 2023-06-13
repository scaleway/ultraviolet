import { Template } from './Template.stories'

export const Tooltip = Template.bind({})

Tooltip.args = {
  ...Template.args,
  tooltip: 'Tooltip text',
}

Tooltip.parameters = {
  docs: {
    storyDescription:
      'You can add a prop "tooltip" which wrap the Button inside a Tooltip component, the optional ref will be applied to the button. For more advanced tooltip usage, we recommand to wrap manually the Button using the Tooltip component.',
  },
}
