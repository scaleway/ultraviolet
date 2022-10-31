import { Template } from './Template.stories'

export const Threshold = Template.bind({})

Threshold.parameters = {
  docs: {
    description: {
      story:
        '`threshold` prop defines the number of tags to display before hiding them into a tooltip.',
    },
  },
}

Threshold.args = {
  tags: [
    'very',
    ...Array<string>(50).fill('large'),
    'tooltip',
    'scaleway',
    'paris',
    'cloud',
  ],
  threshold: 5,
}
