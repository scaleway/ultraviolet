import { Template } from './Template.stories'

export const TimeUnit = Template.bind({})

TimeUnit.args = {
  ...Template.args,
  periodOptions: ['minutes', 'hours', 'days', 'months'],
  hideTimeUnit: false,
  valueUnitInput: 1,
  unitUnitInput: 'hours',
}

TimeUnit.parameters = {
  docs: {
    description: {
      story:
        'It is possible to customise the time unit by defining what periods to display in the dropdown and the default value. It also is possible to hide the time unit with prop `hideTimeUnit`.',
    },
  },
}
