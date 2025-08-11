import { Template } from './Template.stories'

export const Open = Template.bind({})

Open.args = { ...Template.args, header: 'I am open', open: true }

Open.parameters = {
  docs: {
    description: {
      story:
        'For an unconctrolled ExpandableCard open by default, use prop `open`. Otherwise use prop `expanded`.',
    },
  },
}
