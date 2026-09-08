import { Template } from './Template.stories'

export const Helper = Template.bind({})

Helper.args = {
  helper: 'Helper here',
}

Helper.parameters = {
  docs: {
    description: {
      story: 'Use the `helper` prop to add help about the group',
    },
  },
}
