import { Template } from './Template.stories'

export const Disabled = Template.bind({})
Disabled.args = {
  title: 'Title',
  disabled: true,
}
Disabled.parameters = {
  docs: {
    storyDescription:
      'Disabled properties will only disable children of the container. Title, sub-title and header will remain unchanged.',
  },
}
