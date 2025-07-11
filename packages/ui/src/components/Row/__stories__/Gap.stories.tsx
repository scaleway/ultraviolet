import { Template } from './Template.stories'

export const Gap = Template.bind({})

Gap.args = {
  gap: 10,
}

Gap.parameters = {
  docs: {
    description: {
      story:
        'You can use the prop `gap` to separate each element/column. `gap` is a theme space unit.',
    },
  },
}
