import { Template } from './Template.stories'

export const WithTimeUnit = Template.bind({})

WithTimeUnit.args = {
  ...Template.args,
  periodOptions: ['minutes', 'hours', 'days', 'months'],
  hideTimeUnit: false,
  value: 1,
  unit: 'hours',
}
