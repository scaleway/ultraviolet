import { Template } from './Template.stories'

export const As = Template.bind({})

As.args = {
  children: 'Hidden text',
  as: 'div',
}

As.parameters = {
  docs: {
    description: {
      story:
        'You can change the element type using prop `as`. Be careful when using interactive elements (button, a, etc.), as the element is not visible unless focused (via Tab).',
    },
  },
}
