import { Template } from './Template.stories'

export const Helper = Template.bind({})

Helper.args = {
  helper: 'You can either select one or multiple options.',
}

Helper.parameters = {
  docs: {
    storyDescription: 'Use the `helper` prop to set an helper content.',
  },
}
