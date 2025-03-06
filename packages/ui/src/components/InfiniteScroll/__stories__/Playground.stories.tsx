import { Template } from './Template.stories'

export const Playground = Template.bind({})

Playground.decorators = Template.decorators

Playground.parameters = {
  docs: {
    description: {
      story:
        'You can scroll down to load more items. The `onLoadMore` function is called when the user scrolls to the bottom of the list.',
    },
  },
}
