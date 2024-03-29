import { Template } from './Template.stories'

export const Helper = Template.bind({})

Helper.args = {
  name: 'helper',
  legend: 'Legend label',
  helper: 'Helper content',
}

Helper.parameters = {
  docs: {
    description: { story: 'Use the `helper` prop to set an helper content.' },
  },
}
