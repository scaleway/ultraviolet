import { Template } from './Template.stories'

export const Text = Template.bind({})

Text.args = {
  text: 'GB',
}

Text.parameters = {
  docs: {
    storyDescription:
      'You can change text inside SelectNumber by using `text` prop. You can pass directly a text or a component.',
  },
}
