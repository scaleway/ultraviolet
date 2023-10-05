import { Template } from './Template.stories'

export const Placeholder = Template.bind({})

Placeholder.args = {
  placeholder: 'Type a number here',
}

Placeholder.parameters = {
  docs: {
    description: {
      story:
        'You can change the placeholder inside the input by passing a string to the `placeholder` prop.',
    },
  },
}
