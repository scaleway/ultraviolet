import { Template } from './Template.stories'

export const Color = Template.bind({})
Color.args = {
  children: 'This is a colored Text',
  color: 'success',
  variant: 'body',
}
Color.parameters = {
  docs: {
    description: {
      story: 'Set a color using `color` property.',
    },
  },
}
