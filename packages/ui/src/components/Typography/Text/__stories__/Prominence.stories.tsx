import { Template } from './Template.stories'

export const Prominence = Template.bind({})
Prominence.args = {
  children: 'This is a neutral text with prominence',
  prominence: 'weak',
  sentiment: 'neutral',
  variant: 'body',
}
Prominence.parameters = {
  docs: {
    description: {
      story: 'Set a prominence using `prominence` property.',
    },
  },
}
