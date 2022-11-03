import { Template } from './Template.stories'

export const OnClose = Template.bind({})

OnClose.parameters = {
  docs: {
    description: {
      story:
        'Use the `onClose` property to trigger a function when the user clicks on the close button.',
    },
  },
}

OnClose.args = {
  onClose: () => {},
}
