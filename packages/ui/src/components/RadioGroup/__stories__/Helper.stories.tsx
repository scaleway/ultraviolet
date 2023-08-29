import { Template } from './Template.stories'

export const Helper = Template.bind({})

Helper.args = {
  name: 'helper',
  legend: 'Legend label',
  helper: 'Helper content',
}

Helper.parameters = {
  docs: {
    storyDescription: 'Use the `helper` prop to set an helper content.',
  },
}
