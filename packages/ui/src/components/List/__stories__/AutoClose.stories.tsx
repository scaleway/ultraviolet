import { Template } from './Template.stories'

export const AutoClose = Template.bind({})

AutoClose.args = { autoClose: true }

AutoClose.parameters = {
  docs: {
    storyDescription:
      'Automatically closes previously opened expendable content when opening a new one.',
  },
}
