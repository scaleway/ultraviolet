import { Template } from './Template.stories'

export const Placeholder = Template.bind({})

Placeholder.args = {
  label: 'Custom placeholder',
  placeholder: { h: '--', m: '--', period: '-M', s: '--' },
  timeFormat: 12,
}

Placeholder.parameters = {
  docs: {
    description: {
      story:
        'It is possible to set a custom placeholder for every input with prop `placeholder`, which is of type `Time`',
    },
  },
}
