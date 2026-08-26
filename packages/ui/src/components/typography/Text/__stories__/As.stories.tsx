import { Template } from './Template.stories'

export const As = Template.bind({})
As.args = {
  as: 'p',
  children: 'This is a paragraph text',
  variant: 'body',
}
As.parameters = {
  docs: {
    description: {
      story: 'Set a different tag using `as` property.',
    },
  },
}
