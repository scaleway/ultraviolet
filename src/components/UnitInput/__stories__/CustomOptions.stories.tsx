import { Template } from './Template.stories'

export const CustomOptions = Template.bind({})

CustomOptions.args = {
  defaultOption: {
    label: 'GB',
    value: 'gb',
  },
  defaultValue: 100,
  options: [
    {
      label: 'KB',
      value: 'kb',
    },
    {
      label: 'MB',
      value: 'mb',
    },
    {
      label: 'GB',
      value: 'gb',
    },
  ],
}
