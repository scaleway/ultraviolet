import { Template } from './Template.stories'

export const LongTag = Template.bind({})

LongTag.parameters = {
  docs: {
    description: {
      story:
        'Whenever a tag is too long it will automatically shrink and add a tooltip on top of it so the user can see the full text.',
    },
  },
}

LongTag.args = {
  children:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id. dolor sit amet, consectetur adipiscing elit. Nullam id.',
}
