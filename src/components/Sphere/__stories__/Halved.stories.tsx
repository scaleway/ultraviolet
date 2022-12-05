import { Template } from './Template.stories'

export const Halved = Template.bind({})

Halved.args = {
  colors: ['#333', '#666'],
}

Halved.parameters = {
  docs: {
    storyDescription:
      'Easily add two different colors inside of Sphere component by adding them into `bgColors` property.',
  },
}
