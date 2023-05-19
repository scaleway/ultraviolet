import { Template } from './Template.stories'

export const Placeholder = Template.bind({})

Placeholder.args = {
  placeholder: 'Type a number here',
}

Placeholder.parameters = {
  docs: {
    storyDescription:
      'You can change the placeholder inside the input by passing a string to the `placeholder` prop.',
  },
}
