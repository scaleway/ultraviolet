import { Template } from './Template.stories'
import support from './support.svg'

export const Image = Template.bind({})

Image.parameters = {
  docs: {
    storyDescription:
      'You can change the default image by using the `image` prop. It work as `src` on a img tag.',
  },
}

Image.args = {
  image: support,
  size: 48,
}
