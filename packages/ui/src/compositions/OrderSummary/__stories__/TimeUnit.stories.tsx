import { Template } from './Template.stories'

export const TimeUnit = Template.bind({})

TimeUnit.args = {
  ...Template.args,
  hideTimeUnit: false,
  periodOptions: ['minutes', 'hours', 'days', 'months'],
  unitUnitInput: 'hours',
  valueUnitInput: 1,
}

TimeUnit.parameters = {
  docs: {
    description: {
      story:
        'It is possible to customise the time unit by defining what periods to display in the dropdown and the default value. It also is possible to hide the time unit with prop `hideTimeUnit`.',
    },
  },
}
