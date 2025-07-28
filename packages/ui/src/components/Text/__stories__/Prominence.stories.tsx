import { Template } from './Template.stories'

export const Prominence = Template.bind({})
Prominence.args = {
  children: 'This is a colored text with prominence',
  prominence: 'weak',
  sentiment: 'danger',
  variant: 'body',
}
Prominence.parameters = {
  docs: {
    description: {
      story: 'Set a prominence using `prominence` property.',
    },
  },
}
