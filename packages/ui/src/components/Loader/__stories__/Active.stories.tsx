import { Template } from './Template'

export const Active = Template.bind({})

Active.args = {
  active: true,
}

Active.parameters = {
  docs: {
    storyDescription:
      'You can set the `active` prop to indicate to set the indicator active.',
  },
}
