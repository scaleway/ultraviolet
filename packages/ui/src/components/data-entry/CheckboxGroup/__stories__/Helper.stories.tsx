import { Template } from './Template.stories'

export const Helper = Template.bind({})

Helper.args = {
  helper: 'You can either accept or decline the conditions.',
}

Helper.parameters = {
  docs: {
    description: { story: 'Use the `helper` prop to set an helper content.' },
  },
}
