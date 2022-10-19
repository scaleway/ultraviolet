import { Template } from './Template.stories'
import avatar from './avatar.svg'

export const Size = Template.bind({})

Size.args = {
  image: avatar,
  size: 48,
}

Size.parameters = {
  docs: {
    storyDescription:
      'You can change the default Size by using the `Size` prop. It work as `src` on a img tag.',
  },
}
