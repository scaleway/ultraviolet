import type { ComponentStory } from '@storybook/react'
import ActionBar from '..'

export const Ranks: ComponentStory<typeof ActionBar> = props => (
  <>
    <ActionBar {...props} rank={1}>
      I am an Action Bar with rank 1
    </ActionBar>
    <ActionBar {...props} rank={2}>
      I am an Action Bar with rank 2
    </ActionBar>
  </>
)

Ranks.parameters = {
  docs: {
    story: {
      description:
        'You can choose the order of multiple `ActionBar` by using the `rank` prop.',
    },
  },
}
