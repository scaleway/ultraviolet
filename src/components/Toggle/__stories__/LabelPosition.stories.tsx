import { Template } from './Template.stories'

export const LabelPosition = Template.bind({})

LabelPosition.args = {
  label: 'Toggle me on',
  name: 'label',
  labelPosition: 'left',
}

LabelPosition.parameters = {
  docs: {
    storyDescription:
      'Easily change the position of the label by passing `labelPosition` prop.',
  },
}
