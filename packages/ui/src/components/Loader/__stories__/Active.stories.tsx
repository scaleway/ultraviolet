import { Template } from './Template.stories'

export const Active = Template.bind({})

Active.args = {
  active: true,
}

Active.parameters = {
  docs: {
    description: {
      story:
        'You can set the `active` prop to indicate to set the indicator active.',
    },
  },
}
