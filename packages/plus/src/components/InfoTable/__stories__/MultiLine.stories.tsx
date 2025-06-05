import { Template } from './Template.stories'

export const MultiLine = Template.bind({})

MultiLine.args = { ...Template.args, multiLine: true }

MultiLine.parameters = {
  docs: {
    description: {
      story:
        'Setting `multiLine` to true ensures the content is displayed on a multiple lines. Otherwise, there is an ellipsis and a tooltip for overflowed text.',
    },
  },
}
