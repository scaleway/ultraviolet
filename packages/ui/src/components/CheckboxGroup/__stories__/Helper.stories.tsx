import { Template } from './Template.stories'

export const Helper = Template.bind({})

Helper.args = {
  helper: 'You can either accept or decline the conditions.',
}

Helper.parameters = {
  docs: {
    storyDescription: 'Use the `helper` prop to set an helper content.',
  },
}
