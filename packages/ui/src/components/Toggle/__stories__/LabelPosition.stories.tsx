import { Template } from './Template.stories'

export const LabelPosition = Template.bind({})

LabelPosition.args = {
  label: 'Toggle me on',
  labelPosition: 'left',
  name: 'label',
}

LabelPosition.parameters = {
  docs: {
    description: {
      story:
        'Easily change the position of the label by passing `labelPosition` prop.',
    },
  },
}
