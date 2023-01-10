import { Template } from './Template.stories'

export const Extend = Template.bind({})

Extend.args = {
  icon: 'plus',
  extend: true,
  children: 'Extend button !',
}

Extend.parameters = {
  docs: {
    storyDescription:
      'This shows how to make button extensible using `extend` on Button. ⚠️ It requires an `icon`.',
  },
}
