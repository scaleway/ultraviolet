import { Template } from './Template.stories'

export const DisabledTooltip = Template.bind({})

DisabledTooltip.args = {
  minValue: 0,
  maxValue: 1,
  disabledTooltip: 'This is the content of the disabled tooltip',
}

DisabledTooltip.parameters = {
  docs: {
    storyDescription:
      'You can add a tooltip on left and rights button by using `disabledTooltip` prop. Try to hover on the "-" and "+".',
  },
}
