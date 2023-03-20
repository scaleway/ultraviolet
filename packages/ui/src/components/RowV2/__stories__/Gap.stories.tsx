import { Template } from './Template.stories'

export const Gap = Template.bind({})

Gap.args = {
  gap: 2,
}

Gap.parameters = {
  docs: {
    storyDescription:
      'You can use the prop `gap` to separate each element/column. `gap` is a theme space unit.',
  },
}
