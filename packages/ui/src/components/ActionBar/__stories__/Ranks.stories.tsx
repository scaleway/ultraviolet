import { Template } from './Template.stories'

export const Ranks = Template.bind({})

Ranks.args = {
  rank: 1,
}

Ranks.parameters = {
  docs: {
    storyDescription:
      'You can choose the order of multiple `ActionBar` by using the `rank` prop.',
  },
}
