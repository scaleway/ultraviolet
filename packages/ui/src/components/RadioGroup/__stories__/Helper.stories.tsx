import { Template } from './Template.stories'

export const Helper = Template.bind({})

Helper.args = {
  helper: 'Helper content',
  legend: 'Legend label',
  name: 'helper',
}

Helper.parameters = {
  docs: {
    description: { story: 'Use the `helper` prop to set an helper content.' },
  },
}
