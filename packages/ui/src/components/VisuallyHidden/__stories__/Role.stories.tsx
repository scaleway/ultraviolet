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
        'You can change the element type using prop `as`. Do not use any interactive element, as the element is not visible.',
    },
  },
}
